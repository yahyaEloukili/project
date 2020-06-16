import { Component, OnInit } from '@angular/core';
import { Categorie } from "../../models/categorie";
import { CategorieService } from "../../services/categorie.service";
import { AppareilService } from "../../services/appareil.service";
import { observable, of } from 'rxjs';
import { ZoneService } from 'src/app/services/zone.service';
import { UserService } from 'src/app/services/user.service';
import { StockService } from 'src/app/services/stock.service';



import { AuthService } from "../../services/auth.service";
import { ValidateService } from "../../services/validate.service";
import { FileDetector } from "protractor";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { User } from "../../models/user";

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  categories: Categorie[];
  barChartOptions = {
    scalShowVerticalLines: false,
    responsive: true
  };

  barChartLabels;
  barChartLabels1;
  barChartLabels2;
  barChartLabels3;
  barChartLabels4;
  barChartLabels5;
  barChartLabels6;


  barChartType = 'bar';
  barChartLegend = true
  barChartData =
    [{ data: [], label: '', backgroundColor: '#e1b382' }
    ]
  barChartData1 =
    [
      { data: [], label: '' }

    ]
  barChartData2 =
    [
      { data: [], label: '', backgroundColor: '#f2d53c' }

    ]
  barChartData3 =
    [
      {
        data: [], label: '', backgroundColor: 'rgba(47, 132, 71, 0.8)', pointHoverBackgroundColor: 'rgba(78, 180, 189, 1)', pointBackgroundColor: 'rgba(78, 180, 189, 1)'

      }

    ]
  barChartData4 =
    [
      { data: [], label: '', backgroundColor: 'rgba(78, 180, 189, 1)' },
      { data: [], label: '', backgroundColor: '#f95d9b' }

    ]
  barChartData5 =
    [
      { data: [], label: '', backgroundColor: '#8cbcd0' }

    ]
  barChartData6 =
    [
      { data: [], label: '', backgroundColor: '#a39274' }

    ]

  options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0
        }
      }]
    }
  };
  constructor(private router: Router,
    public authService: AuthService,
    private validateService: ValidateService,
    private flashService: FlashMessagesService, private categorieService: CategorieService, private stockService: StockService, private userService: UserService, private appareilService: AppareilService, private zoneService: ZoneService) { }
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

  ngOnInit(): void {



    this.chart1();
    this.chart2();
    this.chart3()
    this.chart4()
    this.chart5()
    this.chart6()
    this.chart7()

  }
  chart7() {

    let arrayStocks = [];

    // this.stockService.getStocks().subscribe(stocks => {

    //   stocks.data.forEach(element => {
    //     arrayStocks.push(element.nom);
    //   });

    // })

    this.appareilService.getAppareilsOfStockArrayLength().subscribe(appareilData => {

      this.barChartData6[0].data = appareilData.data.appareils;
      this.barChartLabels6 = appareilData.data.stocksNames;
      this.barChartData6[0].label = 'Appareils';

    })



  }
  chart1() {

    let arrayCategories = [];



    this.appareilService.getAppareilsArrayLength().subscribe(appareils => {

      this.barChartData[0].data = appareils.data.appareils;
      this.barChartLabels = appareils.data.categroiesNames;
      this.barChartData[0].label = 'Appareils par categorie';

    })



  }
  chart6() {

    let arrayZones = [];

    this.zoneService.getZones().subscribe(zones => {

      zones.data.forEach(element => {
        arrayZones.push(element.nom);
      });

    })

    this.userService.getUsersOfZones().subscribe(users => {

      this.barChartData5[0].data = users.data.users;
      this.barChartLabels5 = users.data.zonesNames;
      this.barChartData5[0].label = 'Utilisateurs';

    })



  }
  chart5() {

    let arrayCategories = [];



    this.appareilService.getAppareilsArrayCategorieBonEtat().subscribe(appareils => {

      this.barChartData4[0].data = appareils.data.appareils;
      this.barChartLabels4 = appareils.data.categoriesNames;
      this.barChartData4[0].label = 'Bon etat';

    })
    this.appareilService.getAppareilsArrayCategorieMauvaisEtat().subscribe(appareils => {

      this.barChartData4[1].data = appareils.data.appareils;
      this.barChartData4[1].label = 'Mauvais etat';

    })


  }
  chart2() {

    let arrayEtat = ['Défaillant', 'Mauvais etat', 'En panne', 'Bon etat'];

    this.appareilService.getAppareilsOfEtatArrayLength().subscribe(appareils => {
      this.barChartData1[0].data = appareils.data.appareils;
      this.barChartLabels1 = appareils.data.etats
      this.barChartData1[0].label = 'Appareils par etat';
    })

  }
  chart3() {



    this.appareilService.getAppareilsOfStatutArrayLength().subscribe(appareils => {
      this.barChartData2[0].data = appareils.data.appareils;
      this.barChartLabels2 = appareils.data.statuts
      this.barChartData2[0].label = 'Appareils par statut';
    })



  }

  chart4() {

    // let arrayCategories = [];



    // this.categorieService.getCategoriesDalay().subscribe(categories => {
    //   this.barChartData3[0].data = categories.data.durees;
    //   this.barChartLabels3 = categories.data.categoriesNames;
    //   this.barChartData3[0].label = 'Durees moyennes';
    // }
    // )
    let array1 = [];
    let array2 = [];


    this.categorieService.getCategories().subscribe(categories => {
      this.categorieService.getCategories2().subscribe(elements => {
        categories.data.forEach(categorie => {
          let temp = elements.data.find(el => el.id === categorie.id)
          if (!temp) {
            array1.push(categorie.name)
            array2.push(0)
          } else {
            array1.push(categorie.name)
            array2.push((Math.round(+temp['moyen-duration'] / 1000 / 3600)))
          }


        })
        console.log(array1, array2);
        this.barChartData3[0].data = array2;
        this.barChartLabels3 = array1;
        this.barChartData3[0].label = 'Durees moyennes';
      })

    })
  }
}
