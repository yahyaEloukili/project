import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { AuthService } from "../../services/auth.service";
import { ValidateService } from "../../services/validate.service";
import { FileDetector } from "protractor";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { User } from "../../models/user";

@Component({
  selector: "app-receive-password",
  templateUrl: "./receive-password.component.html",
  styleUrls: ["./receive-password.component.css"]
})
export class ReceivePasswordComponent implements OnInit {
  user = {
    email: ""
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private validateService: ValidateService,
    private flashService: FlashMessagesService
  ) {}

  ngOnInit(): void {}
  onLoginSubmit({ value, valid }: { value: any; valid: boolean }) {
    this.authService.receivePassword(value).subscribe(
      data => {
        if (valid && data.success) {
          this.router.navigate(["/login"]);
          this.flashService.show(
            "verifier ton email, on vient de vous envoyer votre password",
            {
              cssClass: "alert-success",
              timeout: 3000
            }
          );
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
