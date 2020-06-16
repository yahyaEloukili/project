import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Zone } from "../../models/zone";
import { ZoneService } from "../../services/zone.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/catch";
import { Route } from "@angular/compiler/src/core";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-edit-zone",
  templateUrl: "./edit-zone.component.html",
  styleUrls: ["./edit-zone.component.css"]
})
export class EditZoneComponent implements OnInit {
  id: string;
  errorNom = false;
  valueNom = false;
  constructor(
    private zoneService: ZoneService,
    private flashService: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService
  ) { }
  onLogoutClick() {
    this.authService.logout();
    // this.authService.setAuth(false);
    // this.authorized = this.authService.auth;

    this.router.navigate(["/login"]);
    return false;
  }
  zone: Zone = {
    id: "",
    nom: ""
  };
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.zoneService.getZone(this.id).subscribe(zone => {
      this.zone = zone.data;
    });
  }

  clickNom(ev) {
    this.valueNom = true;
  }
  onEditZone({ value, valid }: { value: Zone; valid: boolean }) {
    let error;
    this.id = this.route.snapshot.params["id"];
    if (valid) {
      this.zoneService.editZone(this.id, value).subscribe(
        zoneData => {
          if (zoneData.success) {
            this.flashService.show("zone modifiée", {
              cssClass: "alert-success",
              timeout: 3000
            });
            this.router.navigate(["/zones"]);
          }
        },
        error =>
          this.flashService.show(error.error.error, {
            cssClass: "alert-danger",
            timeout: 3000
          })
      );
    } else {
      if (!value.nom) {
        this.errorNom = true;

      }
    }
  }
}
