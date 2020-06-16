import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Categorie } from "../../models/categorie";
import { CategorieService } from "../../services/categorie.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/catch";
import { Route } from "@angular/compiler/src/core";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-edit-categorie",
  templateUrl: "./edit-categorie.component.html",
  styleUrls: ["./edit-categorie.component.css"]
})
export class EditCategorieComponent implements OnInit {
  id: number;
  constructor(
    private categorieService: CategorieService,
    private flashService: FlashMessagesService,
    private router: Router,
    public authService: AuthService,
    private route: ActivatedRoute
  ) { }
  onLogoutClick() {
    this.authService.logout();
    // this.authService.setAuth(false);
    // this.authorized = this.authService.auth;

    this.router.navigate(["/login"]);
    return false;
  }
  categorie: Categorie = {
    id: 0,
    name: "",
    delay: 0
  };
  errorNom = false;
  valueNom = false;
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.categorieService.getCategorie(this.id).subscribe(categorie => {
      this.categorie = categorie.data;

    });
  }
  clickNom(ev) {
    this.valueNom = true;
  }
  onEditCategorie({ value, valid }: { value: Categorie; valid: boolean }) {
    console.log(value);
    let error;
    this.id = this.route.snapshot.params["id"];

    if (valid) {
      this.categorieService.editCategorie(this.id, value).subscribe(
        categorieData => {
          if (categorieData.success) {

            this.router.navigate(["/categories"]);
          }
        },
        error =>
          this.flashService.show(error.error.error, {
            cssClass: "alert-danger",
            timeout: 3000
          })
      );
    } else {

      if (!value.name) {
        this.errorNom = true;

      }
    }
  }
}
