import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { AuthService } from "../../services/auth.service";
import { ValidateService } from "../../services/validate.service";
import { FileDetector } from "protractor";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { User } from "../../models/user";

@Component({
  selector: "app-recet-password",
  templateUrl: "./recet-password.component.html",
  styleUrls: ["./recet-password.component.css"]
})
export class RecetPasswordComponent implements OnInit {
  user = {
    email: "",
    password: "",
    newPassword: "",
    newPassword2: ""
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private validateService: ValidateService,
    private flashService: FlashMessagesService
  ) {}

  ngOnInit(): void {}
  onLoginSubmit({ value, valid }: { value: any; valid: boolean }) {
    if(valid){
    if(value.newPassword2===value.newPassword){
    this.authService.recetPassword(value).subscribe(
      data => {
        if (data.success) {
          this.router.navigate(["/login"]);
        }
        this.flashService.show("Password modifiée avec succées", {
          cssClass: "alert-success",
          timeout: 3000
        });
      },
      error =>
        this.flashService.show(error.error.error, {
          cssClass: "alert-danger",
          timeout: 3000
        })
    );
      }
      else{
        this.flashService.show("Verifier mots de passes", {
          cssClass: "alert-danger",
          timeout: 3000
        });
      }
  }
  else{
    if(value.password ==="" || value.newPassword === "" || value.newPassword2===""){
      this.flashService.show("Mercie d'entrer les champs qui sont obligatoires", {
        cssClass: "alert-danger",
        timeout: 3000
      })
    }


    }
  }
}

