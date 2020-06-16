import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Categorie } from "../../models/categorie";
import { StockService } from "../../services/stock.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/catch";
import { Route } from "@angular/compiler/src/core";
import { Stock } from "src/app/models/stock";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-edit-stock",
  templateUrl: "./edit-stock.component.html",
  styleUrls: ["./edit-stock.component.css"]
})
export class EditStockComponent implements OnInit {
  id: string;
  constructor(
    private stockService: StockService,
    private flashService: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService
  ) { }
  onLogoutClick() {
    this.authService.logout();
    // this.authService.setAuth(false);
    // this.authorized = this.authService.auth;

    this.router.navigate(["/login"]);
    return false;
  }
  stock: Stock = {
    id: "",
    nom: ""
  };
  errorNom = false;
  valueNom = false;
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.stockService.getStock(this.id).subscribe(stock => {
      this.stock = stock.data;
    });
  }
  clickNom(ev) {
    this.valueNom = true;
  }
  onEditstock({ value, valid }: { value: Stock; valid: boolean }) {
    let error;
    this.id = this.route.snapshot.params["id"];

    if (valid) {
      this.stockService.editStock(this.id, value).subscribe(
        stockData => {
          if (stockData.success) {
            this.flashService.show("stock modifiée", {
              cssClass: "alert-success",
              timeout: 3000
            });
            this.router.navigate(["/stocks"]);
          }
        },
        error =>
          this.flashService.show(error.error.error, {
            cssClass: "alert-danger",
            timeout: 3000
          })
      );
    } else {
      if (!value.nom) {
        this.errorNom = true;

      }
    }
  }
}
