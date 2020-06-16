import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { User } from "../../models/user";
import { Zone } from "../../models/zone";
import { ZoneService } from "../../services/zone.service";
import { UserService } from "../../services/user.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import "rxjs/add/operator/catch";
import { Sous_equipement } from "src/app/models/sous_equipements";
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {
  user: User = {
    id: "",
    nom: "",
    email: "",
    password: "",
    matricule: "",
    role: ""
  };

  errorNom = false;
  valueNom = false;
  errorEmail = false;
  valueEmail = false;
  errorRole = false;
  valueRole = false;
  errorZone = false;
  valueZone = false;
  adding: boolean = false;

  zoneId: string;
  role: string;
  zones: any[];
  indice: any;
  constructor(
    private zoneService: ZoneService,
    private userService: UserService,
    private flashService: FlashMessagesService,
    public authService: AuthService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.zoneService.getZones().subscribe(zones => {
      this.zones = [];

      this.zones = zones.data;


    })
  }
  clickNom(ev) {
    this.valueNom = true;
  }
  clickEmail(ev) {
    this.valueEmail = true;
  }
  clickRole(ev) {
    this.valueRole = true;
  }
  clickZone(ev) {
    this.valueZone = true;
  }
  onAddUser(form: NgForm) {
    this.adding = true;
    let error;
    if (form.valid) {
      form.value.zoneId = this.zoneId;
      form.value.role = this.role;
      this.userService.addUser(form.value).subscribe(
        userData => {
          if (userData.success) {
            this.adding = false;


          }
          this.router.navigate(["/users"]);
        },
        error => {
          this.adding = false;
          if (error.error.error === 'Valeurs en double entrées') {
            this.adding = false;
            this.flashService.show("Cette adresse email est déjà utilisée.", {
              cssClass: "alert-danger",
              timeout: 3000
            })
          } else {
            this.adding = false;
            this.flashService.show(error.error.error, {
              cssClass: "alert-danger",
              timeout: 3000
            })
          }
        }
      );
    } else {
      this.adding = false;
      if (!form.value.nom) {
        this.errorNom = true;
        this.adding = false;

      }
      if (!form.value.email) {
        this.adding = false;
        this.errorEmail = true;

      }
      if (!form.value.role) {
        this.adding = false;
        this.errorRole = true;

      }
      if (!this.zoneId) {
        this.adding = false;
        this.errorZone = true;

      }
      else {
        this.adding = false;
        this.errorZone = false;
      }
    }
  }
  setErrorZone() {
    if (!this.indice) {
      this.errorZone = true
    }

  }
  setZone(ev) {
    this.zoneId = ev;
    this.errorZone = false;
    if (ev) {
      this.indice = true;
    }
  }
  setRole(ev) {
    this.role = ev;
  }
}
