import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { AuthService } from "../../services/auth.service";
import { ValidateService } from "../../services/validate.service";
import { FileDetector } from "protractor";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { User } from "../../models/user";
@Component({
  selector: "app-login2",
  templateUrl: "./login2.component.html",
  styleUrls: ["./login2.component.css"]
})
export class Login2Component implements OnInit {
  user = {
    email: "",
    password: ""
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private validateService: ValidateService,
    private flashService: FlashMessagesService
  ) { }

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/']);
    }
  }
  onLoginSubmit({ value, valid }: { value: any; valid: boolean }) {
    this.authService.authUser(value).subscribe(
      data => {

        if (valid && data.success) {
          this.authService.storeUserData(data);


          this.router.navigate(['/'])
            .then(() => {
              window.location.reload();
            });

        }
      },
      error =>
        this.flashService.show(error.error.error, {
          cssClass: "alert-danger",
          timeout: 3000
        })
    );
  }
  onResetClicked() {
    this.router.navigate(["/resetPassword"]);
  }
}
