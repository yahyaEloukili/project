import { Component, OnInit } from "@angular/core";

import { AuthService } from "../../services/auth.service";
import { ValidateService } from "../../services/validate.service";
import { FileDetector } from "protractor";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { User } from "../../models/user";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  user: User = {
    id: "",
    nom: "",
    email: "",
    password: "",
    matricule: "",
    role: ""
  };
  constructor(
    private router: Router,
    private authService: AuthService,
    private validateService: ValidateService,
    private flashService: FlashMessagesService
  ) {}

  ngOnInit(): void {}
  onRegisterSubmit({ value, valid }: { value: User; valid: boolean }) {
    // register user
    this.authService.registerUser(value).subscribe(
      data => {
        if (valid && data.success) {
          this.flashService.show("you are registereda and can log in", {
            cssClass: "alert-success",
            timeout: 3000
          });
          this.router.navigate(["/login"]);
        }
      },
      error =>
        this.flashService.show(error.error.error, {
          cssClass: "alert-danger",
          timeout: 3000
        })
    );
  }
}
