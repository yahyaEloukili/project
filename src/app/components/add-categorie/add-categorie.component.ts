import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Categorie } from "../../models/categorie";
import { CategorieService } from "../../services/categorie.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import "rxjs/add/operator/catch";
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-add-categorie",
  templateUrl: "./add-categorie.component.html",
  styleUrls: ["./add-categorie.component.css"]
})
export class AddCategorieComponent implements OnInit {
  // @ViewChild("file") file: ElementRef;
  categorie: Categorie = {
    id: 0,
    name: "",
    delay: 0
  };
  errorNom = false;
  valueNom = false;
  constructor(
    private categorieService: CategorieService,
    private flashService: FlashMessagesService,
    public authService: AuthService,
    private router: Router
  ) { }

  clickNom(ev) {
    this.valueNom = true;
  }
  onAddCategorie(form: NgForm) {
    let error;
    if (form.valid) {
      this.categorieService.addCategorie(form.value).subscribe(
        categorieData => {
          if (categorieData.success) {
            this.router.navigate(['/categories']);
          }
        },
        error => {
          if (error.error.error === "Valeurs en double entrées") {
            this.flashService.show("Categorie deja ajouté avec ce nom", {
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


      if (!form.value.name) {
        this.errorNom = true;

      }
    }
  }

  ngOnInit(): void { }
}
