import { Component, OnInit, EventEmitter, Output, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { AppareilService } from "../../services/appareil.service";
import { UserService } from "../../services/user.service";
import { MouvementsService } from "../../services/mouvements.service";
import { AppareilMouvementCellComponent } from "../appareil-mouvement-cell/appareil-mouvement-cell.component";
import { AppareilCodeMouvementCellComponent } from "../appareil-code-mouvement-cell/appareil-code-mouvement-cell.component";
import { UserMouvementCellComponent } from "../user-mouvement-cell/user-mouvement-cell.component";
import { ZoneMouvementCellComponent } from "../zone-mouvement-cell/zone-mouvement-cell.component";
import { DateMouvementCellComponent } from "../date-mouvement-cell/date-mouvement-cell.component";
import { DetailMouvementComponent } from "../detail-mouvement/detail-mouvement.component";

import { Appareil } from "../../models/appareils";
import { ClotureComponent } from "../cloture/cloture.component";
import { Mouvement } from "../../models/Mouvement"


import { Observable } from "rxjs";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AgGridAngular } from 'ag-grid-angular'
import { NgClass } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mouvements',
  templateUrl: './depots.component.html',
  styleUrls: ['./depots.component.css']
})
export class DepotsComponent implements OnInit {
  mouvements: Mouvement[];
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;
  columnDefs;
  gridApi

  value
  date1
  date2
  users
  appareils: any[];
  gridColumnApi;
  frameworkComponents: any;
  constructor(private mouvementsService: MouvementsService, private router: Router, public authService: AuthService, private userService: UserService, private appareilService: AppareilService) { }
  onLogoutClick() {
    this.authService.logout();
    // this.authService.setAuth(false);
    // this.authorized = this.authService.auth;

    this.router.navigate(["/login"]);
    return false;
  }
  onChangeDate(date1, date2) {
    console.log(date1, date2);

    this.mouvementsService.getMouvements2().subscribe(mouvements => {
      const mouvementsArray = [];
      mouvements.data.forEach(element => {



        if (new Date(element.createdAt).getTime() >= date1.getTime() - 86400000 && new Date(element.createdAt).getTime() <= date2.getTime() + 86400000) {

          mouvementsArray.push(element);
        }
      })
      this.agGrid.api.setRowData(mouvementsArray);
    })

  }
  setValue(ev) {
    this.value = ev;
    console.log(ev);
    if (ev === 'tout') {
      this.mouvementsService.getMouvements2().subscribe(mouvements => {
        this.agGrid.api.setRowData(mouvements.data);
      })
    }
  }
  ngOnInit(): void {
    this.columnDefs = [


      { headerName: 'Utilisateur', field: "user_nom", sortable: true, filter: true, width: "180" },
      { headerName: 'Appareil', field: "appareil_nom", sortable: true, filter: true, width: "360" },
      { headerName: 'Code', field: "appareil_code", sortable: true, filter: true, width: "155" },
      { headerName: 'Date', field: "createdAt", sortable: true, filter: true, width: "180", cellRenderer: "date" },
      { headerName: 'cloture', field: "coloturer", sortable: true, filter: true, width: "155", cellRenderer: "cloture" },
      { headerName: '', field: "id", sortable: true, filter: true, width: "100", cellRenderer: "detailMouvement" },

    ];
    this.userService.getUsers().subscribe(users => {
      this.users = users.data;
    })
    this.appareilService.getAppareils().subscribe(appareilData => {
      this.appareils = [""];
      appareilData.data.forEach(element => {
        element.nom = element.nom + '-' + element.code;
        this.appareils.push({ id: element.id.toString(), text: element.nom });
      })
    });

    this.frameworkComponents = {
      appareil: AppareilMouvementCellComponent,
      cloture: ClotureComponent,
      user: UserMouvementCellComponent,
      zone: ZoneMouvementCellComponent,
      appareilId: AppareilCodeMouvementCellComponent,
      date: DateMouvementCellComponent,
      detailMouvement: DetailMouvementComponent
    }
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
    this.mouvementsService.getMouvements2().subscribe(mouvements => {
      params.api.setRowData(mouvements.data);
      console.log(mouvements.data);


    })

  }
  setUser(ev) {

    this.mouvementsService.getMouvementsOfSUser2(ev).subscribe(mouvements => {
      this.agGrid.api.setRowData(mouvements.data);
    })
  }
  setAppareil(ev) {
    console.log(ev);
    this.mouvementsService.getMouvementsOfAppareil2(ev).subscribe(appreils => {
      this.agGrid.api.setRowData(appreils.data);
      console.log(appreils.data);
    })
  }
  setMouvement(ev) {
    this.mouvementsService.getMouvementsOfType(ev).subscribe(mouvements => {
      this.agGrid.api.setRowData(mouvements.data);
    })
  }
}
