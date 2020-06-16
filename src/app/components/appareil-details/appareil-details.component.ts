import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Categorie } from "../../models/categorie";
import { AppareilService } from "../../services/appareil.service";
import { CategorieService } from "../../services/categorie.service";
import { StockService } from "../../services/stock.service";
import { Appareil } from "../../models/appareils";
import { Observable } from "rxjs";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Stock } from "src/app/models/stock";
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;
@Component({
  selector: "app-appareil-details",
  templateUrl: "./appareil-details.component.html",
  styleUrls: ["./appareil-details.component.css"]
})
export class AppareilDetailsComponent implements OnInit {
  id: string = "";
  appareil: Appareil = {
    id: "",
    nom: "",
    code: "",
    marque: "",
    photo: "",
    status: "",
    fournisseur: "",
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
    fiche: "",
    frequence: 0
  };
  today = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() }
  date: any;


  errorNom = false;
  valueNom = false;
  errorCode = false;
  valueCode = false;
  errorEtat = false;
  valueEtat = false;
  errorStatut = false;
  valueStatut = false;
  errorStock = false;
  valueStock = false;
  errorPhoto = false;
  errorFiche = false;
  errorCertificat = false;
  options: any;

  categorieId: string;
  categorie_nom: string;
  stock_nom: string;
  stockId: string;
  status: string;
  etat: string;
  categories: any[];
  stocks: any[];
  indice: boolean;
  jsDate: any; adding: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appareilService: AppareilService,
    private flashMessage: FlashMessagesService,
    private categorieService: CategorieService,
    private stockService: StockService,
    public authService: AuthService
  ) { }
  onLogoutClick() {
    this.authService.logout();
    // this.authService.setAuth(false);
    // this.authorized = this.authService.auth;

    this.router.navigate(["/login"]);
    return false;
  }
  seletingphotos() {
    $(function () {

      // This code will attach `fileselect` event to all file inputs on the page
      $(document).on('change', ':file', function () {
        var input = $(this),
          numFiles = input.get(0).files ? input.get(0).files.length : 1,
          label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);

      });


      $(document).ready(function () {
        //below code executes on file input change and append name in text control
        $(':file').on('fileselect', function (event, numFiles, label) {

          var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' fichiers choisis' : label;

          if (input.length) {
            input.val(log);
          } else {
            if (log) alert(log);
          }

        });
      });

    });
  }
  ngOnInit(): void {
    this.seletingphotos();
    $("#select").select2(

    )
    $('#select').on("select2:select", function (e) {
      this.errorCategorie = false;
    });
    this.id = this.route.snapshot.params["id"];
    this.appareilService.getAppareil(this.id).subscribe(appareil => {

      this.appareil = appareil.data;

      if (this.appareil[0].dernier_etalonnage) {
        this.date = { year: new Date(this.appareil[0].dernier_etalonnage).getFullYear(), month: new Date(this.appareil[0].dernier_etalonnage).getMonth() + 1, day: new Date(this.appareil[0].dernier_etalonnage).getDate() }
      }



    });

    $("#datepicker").keypress(function (event) { event.preventDefault(); });
    this.categorieService.getCategories().subscribe(categories => {
      this.categories = categories.data;


    })
    this.stockService.getStocks().subscribe(stocks => {
      this.stocks = stocks.data;

    })

  }

  selectphoto(event) {
    if (event.target.files.length > 0) {
      this.appareil.photo = event.target.files;
      Array.prototype.forEach.call(event.target.files, element => {

        if (!element.type.startsWith('image')) {
          this.errorPhoto = true;
        }
        else {
          this.errorPhoto = false;
        }

      });
    }
  }
  selectfiche(event) {
    if (event.target.files.length > 0) {
      this.appareil.fiche = event.target.files[0];
      if (event.target.files[0].type !== 'application/pdf') {
        this.errorFiche = true;

      }
      else {
        this.errorFiche = false;
      }

    }


  }
  selectcertificat(event) {
    if (event.target.files.length > 0) {
      this.appareil.certificat = event.target.files[0];
      if (event.target.files[0].type !== 'application/pdf') {
        this.errorCertificat = true;

      }
      else {
        this.errorCertificat = false;
      }
    }
  }
  clickNom(ev) {
    this.valueNom = true;
  }
  clickCode(ev) {
    this.valueCode = true;
  }
  clickEtat(ev) {
    this.valueEtat = true;
  }
  clickStatut(ev) {
    this.valueStatut = true;
  }

  clickStock(ev) {
    this.valueStock = true;
  }

  onDateSelect(ev) {

    this.jsDate = new Date(ev.year, ev.month - 1, ev.day);



  }
  onEditAppareil({ value, valid }: { value: Appareil; valid: boolean }) {

    this.id = this.route.snapshot.params["id"];
    const formData = new FormData();
    value.categorieId = this.categorieId;
    value.stockId = this.stockId;
    value.status = this.status;
    value.categorie_nom = this.categorie_nom;
    value.stock_nom = this.stock_nom;
    value.etat = this.etat;
    if (valid) {
      this.adding = true;
      if (this.appareil.photo) {

        for (let photo of this.appareil.photo) {

          formData.append("photos", photo);
        }
      }
      let code = value.code.replace(/\s/g, "");
      if (code) {
        if (code.length === 1) {
          code = `0000000${code}`
        }
        if (code.length === 2) {
          code = `000000${code}`
        }
        if (code.length === 3) {
          code = `00000${code}`
        }
        if (code.length === 4) {
          code = `0000${code}`
        }
        if (code.length === 5) {
          code = `000${code}`
        }
        if (code.length === 6) {
          code = `00${code}`
        }
        if (code.length === 7) {
          code = `0${code}`
        }

      }

      formData.append("nom", value.nom);
      if (this.appareil.fiche) {
        formData.append("fiche", this.appareil.fiche);
      }
      if (this.appareil.certificat) {
        formData.append("certificat", this.appareil.certificat);
      }
      formData.append("code", code);
      if (value.status) {
        formData.append("status", value.status);
      }
      if (value.etat) {
        formData.append("etat", value.etat);
      }
      if (value.stockId) {
        formData.append("stockId", value.stockId);
      }
      if (this.categorie_nom) {
        formData.append('categorie_nom', this.categorie_nom)
      }

      if (this.stock_nom) {
        formData.append('stock_nom', this.stock_nom)
      }

      if (value.categorieId) {
        formData.append("categorieId", value.categorieId);
      }

      formData.append("marque", value.marque);
      formData.append("reference", value.reference);
      if (value.numero_serie) {
        formData.append("numero_serie", value.numero_serie);
      }

      formData.append("remarques", value.remarques);
      formData.append("matricule", value.matricule);
      if (value.frequence) {
        formData.append("frequence", value.frequence);
      }

      formData.append("fournisseur", value.fournisseur);

      if (this.jsDate) {
        formData.append("dernier_etalonnage", this.jsDate);
      }
      else {
        if (this.appareil[0] && this.appareil[0].dernier_etalonnage) {
          formData.append("dernier_etalonnage", this.appareil[0].dernier_etalonnage);
        }

      }
      if (document.getElementById('datepicker').nodeValue) {

      }
      this.appareilService.editAppareil(this.id, formData).subscribe(appareil => {
        if (appareil.success) {
          this.adding = false;

          this.router.navigate(["/appareils"]);
        }
      }, (error) => {
        this.adding = false;
        this.flashMessage.show(error.error.error, {
          cssClass: "alert-danger",
          timeout: 4000
        });
        if (error.error.error === "Format d'image invalide !") {
          this.errorPhoto = true;
          this.adding = false;

        }
        if (error.error.error === "Format de fiche technique invalide !") {
          this.errorFiche = true;
          this.adding = false;

        }
        if (error.error.error === "Format de certificat invalide !") { this.errorCertificat = true; this.adding = false; }
      });
    } else {
      this.adding = false;
      this.flashMessage.show("Merci d'entrer les champs qui sont obligatoires !", {
        cssClass: "alert-danger",
        timeout: 4000
      });
      if (!value.code) {
        this.errorCode = true;
        this.adding = false;

      }
      if (!value.nom) {
        this.errorNom = true;
        this.adding = false;

      }


    }
  }
  setCategorie(ev) {
    this.categorieId = ev;
    this.categorieService.getCategorie(ev).subscribe(categorie => {
      this.categorie_nom = categorie.data.name;
    });

  }
  setStock(ev) {
    this.stockId = ev;
    this.stockService.getStock(ev).subscribe(stock => {
      this.stock_nom = stock.data.nom;
    });
  }
  setStatut(ev) {
    this.status = ev;
  }
  setEtat(ev) {
    this.etat = ev;
  }

}
