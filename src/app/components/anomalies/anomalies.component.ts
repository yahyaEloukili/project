import { Component, OnInit, EventEmitter, Output, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { AppareilService } from "../../services/appareil.service";
import { UserService } from "../../services/user.service";
import { AnomaliesService } from "../../services/anomalies.service";

import { AnomalieDetailCellComponent } from "../anomalie-detail-cell/anomalie-detail-cell.component";
import { AnomalieAppareilCellComponent } from "../anomalie-appareil-cell/anomalie-appareil-cell.component";
import { AnomalieActionsComponent } from "../anomalie-actions/anomalie-actions.component";
import { AnomalieUserCellComponent } from "../anomalie-user-cell/anomalie-user-cell.component";
import { DateAnomalieComponent } from "../date-anomalie/date-anomalie.component";

import { Appareil } from "../../models/appareils";
import { Mouvement } from "../../models/Mouvement"


import { Observable } from "rxjs";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AgGridAngular } from 'ag-grid-angular'
import { NgClass } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-anomalies',
  templateUrl: './anomalies.component.html',
  styleUrls: ['./anomalies.component.css']
})
export class AnomaliesComponent implements OnInit {
  mouvements: Mouvement[];
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;
  loaded: boolean = false;
  columnDefs;
  gridApi
  value
  users
  date1
  date2
  appareils: any[];
  anomalies;
  gridColumnApi;
  frameworkComponents: any;
  constructor(private anomaliesService: AnomaliesService, private router: Router, public authService: AuthService, private userService: UserService, private appareilService: AppareilService) { }

  ngOnInit(): void {

    this.columnDefs = [
      { headerName: 'commentaire', field: "commentaire", sortable: true, filter: true, width: 255 },
      { headerName: 'appareil', field: "appareil_nom", sortable: true, filter: true, width: 200 },
      { headerName: 'user', field: "user_nom", sortable: true, filter: true, width: 100 },
      { headerName: 'etat', field: "etat", sortable: true, filter: true, width: 150 },
      { headerName: 'Declaration', field: "createdAt", sortable: true, filter: true, width: 150, cellRenderer: "date" },
      { headerName: 'Detail', field: "id", sortable: true, filter: true, width: 100, cellRenderer: "id" },
      { headerName: 'Actions', field: "id", sortable: true, filter: true, width: 200, cellRenderer: "actions" },

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
      id: AnomalieDetailCellComponent,
      user: AnomalieUserCellComponent,
      appareil: AnomalieAppareilCellComponent,
      actions: AnomalieActionsComponent,
      date: DateAnomalieComponent

    }



  }

  setValue(ev) {
    this.value = ev;

    if (ev === 'tout') {
      this.anomaliesService.getAnomalies().subscribe(mouvements => {
        this.agGrid.api.setRowData(mouvements.data);
      })
    }
  }
  setUser(ev) {

    this.anomaliesService.getAnamolieOfSUser(ev).subscribe(anomalies => {
      this.agGrid.api.setRowData(anomalies.data);
    })
  }
  setAppareil(ev) {

    this.anomaliesService.getAnamolieOfSAppareil(ev).subscribe(appreils => {
      this.agGrid.api.setRowData(appreils.data);

    })
  }
  onChangeDate(date1, date2) {
    console.log(date1, date2);

    this.anomaliesService.getAnomalies().subscribe(anomalies => {
      const anomaliesArray = [];
      anomalies.data.forEach(element => {



        if (new Date(element.createdAt).getTime() >= date1.getTime() - 86400000 && new Date(element.createdAt).getTime() <= date2.getTime() + 86400000) {

          anomaliesArray.push(element);
        }
      })
      this.agGrid.api.setRowData(anomaliesArray);
    })

  }
  onGridReady(params) {

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
    this.anomaliesService.getAnomalies().subscribe(anomalies => {
      console.log(anomalies.data);

      params.api.setRowData(anomalies.data);



    })

  }

}


