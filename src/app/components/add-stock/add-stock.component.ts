import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Stock } from "../../models/stock";
import { StockService } from "../../services/stock.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import "rxjs/add/operator/catch";
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-add-stock",
  templateUrl: "./add-stock.component.html",
  styleUrls: ["./add-stock.component.css"]
})
export class AddStockComponent implements OnInit {
  // @ViewChild("file") file: ElementRef;
  stock: Stock = {
    id: "",
    nom: ""
  };
  errorNom = false;
  valueNom = false;

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
  constructor(
    private stockService: StockService,
    private flashService: FlashMessagesService,
    public authService: AuthService,
    private router: Router
  ) { }
  clickNom(ev) {
    this.valueNom = true;
  }
  onAddStock(form: NgForm) {
    let error;
    if (form.valid) {
      this.stockService.addStock(form.value).subscribe(
        StockData => {
          if (StockData.success) {
            this.router.navigate(['/stocks']);
          }
        },
        error => {
          if (error.error.error === "Valeurs en double entrées") {
            this.flashService.show("Stock deja ajouté avec ce nom", {
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
      if (!form.value.nom) {
        this.errorNom = true;

      }
    }
  }

  ngOnInit(): void { }
}
