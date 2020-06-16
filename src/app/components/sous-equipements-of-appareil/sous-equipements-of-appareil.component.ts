import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { SousEquipementsService } from "../../services/sous-equipement.service";
import { AppareilService } from "../../services/appareil.service";

import { AuthService } from "../../services/auth.service";
import { Sous_equipement } from "../../models/sous_equipements";
import { Appareil } from "../../models/appareils";
import { Observable } from "rxjs";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlxUiDataTable } from "flx-ui-datatable";
@Component({
  selector: "app-sous-equipements-of-appareil",
  templateUrl: "./sous-equipements-of-appareil.component.html",
  styleUrls: ["./sous-equipements-of-appareil.component.css"]
})
export class SousEquipementsOfAppareilComponent implements OnInit {
  sous_equipements: Sous_equipement[];

  profile: any;
  url: string
  count: any;
  buttons = [
    {
      class: "btn-success",
      icon: "fa fa-eye",
      tooltip: "Mdifier",
      tooltipPosition: "left"
    },
    {
      class: "btn-success",
      icon: "fa fa-edit",
      tooltip: "Mdifier",
      tooltipPosition: "left"
    },
    {
      class: "btn-danger",
      icon: "fa fa-trash",
      tooltip: "Supprimer",
      tooltipPosition: "left"
    }
  ];
  id: any;
  appareil: Appareil;
  onLogoutClick() {
    this.authService.logout();
    // this.authService.setAuth(false);
    // this.authorized = this.authService.auth;

    this.router.navigate(["/login"]);
    return false;
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sousEquipementsService: SousEquipementsService,
    private appareilService: AppareilService
    ,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    public dataService: FlxUiDataTable
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.url = "api/v1/appareils/" + this.id + "/sous_equipements"

    this.dataService.flxDatatableData.subscribe(sous_equipements => {
      this.sous_equipements = sous_equipements;
      this.count = this.sous_equipements?.length;
    });
    this.appareilService.getAppareil(this.id).subscribe(appareil => {
      this.appareil = appareil?.data;
      console.log(this.appareil);
    })
  }




}
