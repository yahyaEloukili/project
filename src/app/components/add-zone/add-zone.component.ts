import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Appareil } from "../../models/appareils";
import { Zone } from "../../models/zone";
import { AppareilService } from "../../services/appareil.service";
import { CategorieService } from "../../services/categorie.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import "rxjs/add/operator/catch";
import { Sous_equipement } from "src/app/models/sous_equipements";
import { ZoneComponent } from "../zone/zone.component";
import { ZoneService } from "src/app/services/zone.service";
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-add-zone",
  templateUrl: "./add-zone.component.html",
  styleUrls: ["./add-zone.component.css"]
})
export class AddZoneComponent implements OnInit {
  zone: Zone = {
    id: "",
    nom: ""
  };
  errorNom = false;
  valueNom = false;
  constructor(
    private zoneService: ZoneService,
    private flashService: FlashMessagesService,
    private router: Router,
    public authService: AuthService
  ) { }
  onLogoutClick() {
    this.authService.logout();
    // this.authService.setAuth(false);
    // this.authorized = this.authService.auth;
    this.flashService.show("you are loged out", {
      cssClass: "alert-success",
      timeout: 3000
    });
    this.router.navigate(["/login"]);
    return false;
  }
  clickNom(ev) {
    this.valueNom = true;
  }
  onAddZone(form: NgForm) {
    let error;
    if (form.valid) {
      this.zoneService.addZone(form.value).subscribe(
        zoneData => {
          if (zoneData.success) {
            this.router.navigate(['/zones']);
          }
        },
        error => {
          if (error.error.error === "Valeurs en double entrées") {
            this.flashService.show("Zone deja ajouté avec ce nom", {
              cssClass: "alert-danger",
              timeout: 3000
            });
          } else {
            this.flashService.show(error.error.error, {
              cssClass: "alert-danger",
              timeout: 3000
            });
          }
        }
      );
    } else {
      if (!form.value.nom) {
        this.errorNom = true;

      }
    }
  }

  ngOnInit(): void { }
}
