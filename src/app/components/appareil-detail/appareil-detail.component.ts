import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Appareil } from "../../models/appareils";
import { Categorie } from "../../models/categorie";
import { Stock } from "../../models/stock";
import { AppareilService } from "../../services/appareil.service";
import { CategorieService } from "../../services/categorie.service";
import { SousEquipementsService } from "../../services/sous-equipement.service";
import { CustomizedCellComponent } from '../customized-cell/customized-cell.component';
import { ButtonsCellComponent } from '../buttons-cell/buttons-cell.component';

import { AgGridAngular } from 'ag-grid-angular';
import { ButtonsCell2Component } from '../buttons-cell2/buttons-cell2.component';
import { CustomizedCell2Component } from '../customized-cell2/customized-cell2.component';
import { AnomalieAppareilCellComponent } from '../anomalie-appareil-cell/anomalie-appareil-cell.component';
import { StockService } from "../../services/stock.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { prod } from "../../prod/prod";
import { Sous_equipement } from 'src/app/models/sous_equipements';
import { AppareilSouEquipementComponent } from '../appareil-sou-equipement/appareil-sou-equipement.component';
declare var $: any;
@Component({
  selector: "app-appareil-detail",
  templateUrl: "./appareil-detail.component.html",
  styleUrls: ["./appareil-detail.component.css"]
})
export class AppareilDetailComponent implements OnInit {
  id: string;
  sous_equipements: Sous_equipement[];
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;
  columnDefs;
  frameworkComponents: any;
  appareils: any[];
  vars: any;
  gridApi: any;
  hiddenCode: Boolean = true;
  gridColumnApi: any;
  appareil: Appareil = {
    id: "",
    nom: "",
    code: "",
    marque: "",
    photo: null,
    status: "",
    etat: "",
    categorieId: "",
    stockId: "",
    categorie_nom: "",
    stock_nom: "",
    dernier_etalonnage: null,
    remarques: "",
    matricule: "",
    reference: "",
    numero_serie: "",
    frequence: 0
  };
  src1; src2; src3; src4; src5; src6; src7;
  hidden: Boolean = true;

  hiddenMatricule: Boolean = true;
  hiddenImage: Boolean = true;
  hiddenNom: Boolean = true;
  hiddenAucune: Boolean = true;
  hiddenEtat: Boolean = true;
  hiddenStatut: Boolean = true;
  hiddenReference: Boolean = true;
  hiddenFrequence: Boolean = true;
  hiddenMarque: Boolean = true;
  hiddenSerie: Boolean = true;
  hiddenCategorie: Boolean = true;
  hiddenStock: Boolean = true;
  hiddenFournisseur: Boolean = true;
  hiddenFiche: Boolean = true;
  hiddenCertificat: Boolean = true;
  hiddenRemarques: Boolean = true;
  hiddenEtalonnage: Boolean = true;
  location: string = `./backend/uploads/${this.appareil.photo}`;

  constructor(
    private appareilService: AppareilService,
    private stockService: StockService,
    private flashService: FlashMessagesService,
    private categorieService: CategorieService,
    public authService: AuthService,
    private router: Router,

    private prod: prod,
    private sousEquipementsService: SousEquipementsService,
    private route: ActivatedRoute
  ) { }
  onLogoutClick() {
    this.authService.logout();
    // this.authService.setAuth(false);
    // this.authorized = this.authService.auth;

    this.router.navigate(["/login"]);
    return false;
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.sousEquipementsService.getSousEquipements(this.id).subscribe(sous_equipements => {
      params.api.setRowData(sous_equipements.data);
      if (sous_equipements.data.length !== 0) {
        this.hidden = false;
      }


    })
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }


  }
  ngOnInit(): void {

    this.columnDefs = [
      { headerName: 'Nom', field: "nom", sortable: true, filter: true, width: "200" },
      { headerName: 'Appareil parrent', field: "appareilId", sortable: true, filter: true, width: "200", cellRenderer: "appareil2" },
      { headerName: 'code', field: "code", sortable: true, filter: true, width: "150" },
      { headerName: 'statut', field: "status", sortable: true, filter: true, width: "150", cellRenderer: "statut" },

      { headerName: 'etat', field: "etat", sortable: true, filter: true, width: "140", cellRenderer: "etat" },
      { headerName: 'Actions', field: "id", sortable: true, filter: true, cellRenderer: "id", width: "120" },

    ];
    this.frameworkComponents = {
      statut: CustomizedCellComponent,
      etat: CustomizedCell2Component,
      id: ButtonsCell2Component,
      appareil2: AppareilSouEquipementComponent,
      appareil: AnomalieAppareilCellComponent

    }
    this.id = this.route.snapshot.params["id"];

    this.appareilService.getAppareil(this.id).subscribe(appareil => {

      if (appareil.data[0]?.categorieId) {
        this.categorieService.getCategorie(appareil.data[0].categorieId).subscribe(catgorie => {
          appareil.data[0].categorie_nom = catgorie.data.name;
        })
      }
      if (appareil.data[0]?.stockId) {
        this.stockService.getStock(appareil.data[0].stockId).subscribe(stock => {
          appareil.data[0].stock_nom = stock.data.nom;
        });
      }

      this.appareil = appareil.data;
      console.log(appareil.data);
      if (appareil.data[0].nom) {
        this.hiddenNom = false;
      }
      if (appareil.data[0].code) {
        this.hiddenCode = false;
      }
      if (appareil.data[0].image.length !== 0) {
        this.hiddenImage = false;
      }
      if (appareil.data[0].image.length === 0) {
        this.hiddenAucune = false;
      }
      if (appareil.data[0].etat) {
        this.hiddenEtat = false;
      }
      if (appareil.data[0].status) {
        this.hiddenStatut = false;
      }
      if (appareil.data[0].numero_serie || appareil.data[0].numero_serie === 0) {
        this.hiddenSerie = false;
      }
      if (appareil.data[0].reference) {
        this.hiddenReference = false;
      }
      if (appareil.data[0].fournisseur) {
        this.hiddenFournisseur = false;
      }
      if (appareil.data[0].marque) {
        this.hiddenMarque = false;
      }
      if (appareil.data[0].fiche) {
        this.hiddenFiche = false;
      }
      if (appareil.data[0].certificat) {
        this.hiddenCertificat = false;
      }
      if (appareil.data[0].matricule) {
        this.hiddenMatricule = false;
      }
      if (appareil.data[0].dernier_etalonnage) {
        this.hiddenEtalonnage = false;
      }
      if (appareil.data[0].categorieId) {
        this.hiddenCategorie = false;
      }
      if (appareil.data[0].stockId) {
        this.hiddenStock = false;
      }
      if (appareil.data[0].remarques) {
        this.hiddenRemarques = false;
      }
      if (appareil.data[0].frequence || appareil.data[0].frequence === 0) {
        this.hiddenFrequence = false;
      }

      this.src1 = `${this.prod.link2}/uploads/` + this.appareil[0]?.image[0];

      this.src2 = `${this.prod.link2}/uploads/` + this.appareil[0]?.image[1];
      this.src3 = `${this.prod.link2}/uploads/` + this.appareil[0]?.image[2];
      this.src4 = `${this.prod.link2}/uploads/` + this.appareil[0]?.image[3];

      this.src5 = `${this.prod.link2}/uploads/` + this.appareil[0]?.image[4];
      this.src6 = `${this.prod.link2}/uploads/` + this.appareil[0]?.fiche;
      this.src7 = `${this.prod.link2}/uploads/` + this.appareil[0]?.certificat;


    });

  }
  navigate(ev) {
    this.router.navigate([`/accessoires/${ev}`]);
  }
}

