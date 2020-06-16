import { Component, OnInit, Input } from "@angular/core";

import { AuthService } from "../../services/auth.service";
import { ValidateService } from "../../services/validate.service";
import { FileDetector } from "protractor";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { User } from "../../models/user";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  user: {
    nom: "";
  };

  authorized: any = true;
  constructor(
    private router: Router,
    public authService: AuthService,
    private validateService: ValidateService,
    private flashService: FlashMessagesService
  ) {}

  ngOnInit(): void {}

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
}
