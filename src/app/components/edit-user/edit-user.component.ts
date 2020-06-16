import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Zone } from "../../models/zone";
import { ZoneService } from "../../services/zone.service";
import { UserService } from "../../services/user.service";
import { Appareil } from "../../models/appareils";
import { Observable } from "rxjs";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "src/app/models/user";
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.css"]
})
export class EditUserComponent implements OnInit {
  user: User = {
    id: "",
    nom: "",
    email: "",
    matricule: "",
    password: "",
    role: "",
    zoneId: ""
  };
  id: string = "";
  zoneId: string;
  role: string;
  zones: any[];
  errorNom = false;
  errorEmail = false;
  valueNom = false;
  valueEmail = false;
  adding: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private zoneService: ZoneService,
    private flashMessage: FlashMessagesService,
    public authService: AuthService,
    private userService: UserService
  ) { }
  onLogoutClick() {
    this.authService.logout();
    // this.authService.setAuth(false);
    // this.authorized = this.authService.auth;

    this.router.navigate(["/login"]);
    return false;
  }
  clickNom(ev) {
    this.valueNom = true;
  }
  clickEmail(ev) {
    this.valueEmail = true;
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.userService.getUser(this.id).subscribe(user => {
      this.user = user.data;
    });
    this.zoneService.getZones().subscribe(zones => {
      this.zones = zones.data;

    })
  }
  onEditUser({ value, valid }: { value: User; valid: boolean }) {
    this.adding = true;
    this.id = this.route.snapshot.params["id"];
    value.zoneId = this.zoneId;
    value.role = this.role;
    if (valid) {
      this.userService.editUser(this.id, value).subscribe(appareil => {
        if (appareil.success) {
          this.adding = false;

          this.router.navigate(["/users"]);
        }
      }, error => {
        this.adding = false;
        this.flashMessage.show(error.error.error, {
          cssClass: "alert-success",
          timeout: 3000
        });
      });
    }
    else {
      this.adding = false;
      if (!value.nom) {
        this.errorNom = true;
        this.adding = false;

      }
      if (!value.email) {
        this.errorEmail = true;
        this.adding = false;

      }
    }
  }
  setZone(ev) {
    this.zoneId = ev;
    this.zoneService.getZone(this.zoneId).subscribe(zone => {
      this.userService.editUser(this.id, { zone_nom: zone.data.nom }).subscribe();
    })

  }
  setRole(ev) {
    this.role = ev;
  }
}
