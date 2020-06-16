import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Appareil } from "../../models/appareils";
import { Categorie } from "../../models/categorie";
import { Stock } from "../../models/stock";
import { AppareilService } from "../../services/appareil.service";
import { CategorieService } from "../../services/categorie.service";
import { StockService } from "../../services/stock.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import "rxjs/add/operator/catch";
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import "ng-select2";
import { Sous_equipement } from "src/app/models/sous_equipements";
import { NONE_TYPE } from '@angular/compiler';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;
@Component({
  selector: "app-add-appareil",
  templateUrl: "./add-appareil.component.html",
  styleUrls: ["./add-appareil.component.css"]
})
export class AddAppareilComponent implements OnInit {

  today = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() }


  // @ViewChild("file") file: ElementRef;
  appareil: Appareil = {
    id: "",
    nom: "",
    code: "",
    marque: "",
    photo: "",
    status: "",
    etat: "",
    dernier_etalonnage: null,
    remarques: "",
    fournisseur: "",
    matricule: "",
    reference: "",
    numero_serie: null,
    frequence: null,
    certificat: '',
    fiche: ''
  };

  etalonnage;
  errorNom = false;
  valueNom = false;
  errorCode = false;
  valueCode = false;
  errorEtat = false;
  valueEtat = false;
  errorStatut = false;
  valueStatut = false;
  errorCategorie = false;
  valueCategorie = false;
  errorStock = false;
  valueStock = false;
  errorPhoto = false;
  errorDate = false
  errorDate2 = false
  categorieId: string;
  stockId: string;
  status: string;
  etat: string;
  categories: any[];
  stocks: any[];
  errorFiche = false;
  errorCertificat: boolean = false;
  options: any;
  indice: boolean = false;
  indice2: boolean = false;
  jsDate: any;
  adding: boolean = false;
  selected;

  constructor(
    private appareilService: AppareilService,
    private categorieService: CategorieService,
    private stockService: StockService,
    private flashService: FlashMessagesService,
    private router: Router,
    private config: NgbDatepickerConfig,
    public authService: AuthService
  ) {
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

  selectCertificat(event) {
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
  clickCategorie(ev) {
    this.valueCategorie = true;
  }
  clickStock(ev) {
    this.valueStock = true;
  }

  onDateSelect(ev) {

    this.jsDate = new Date(ev.year, ev.month - 1, ev.day);



  }

  onAddAppareil(form: NgForm) {
    let error;
    if (form.valid) {
      form.value.categorieId = this.categorieId;
      form.value.stockId = this.stockId;
      form.value.status = this.status;
      form.value.etat = this.etat;
      const formData = new FormData();
      for (let photo of this.appareil.photo) {

        formData.append("photos", photo);
      }
      let code = form.value.code.replace(/\s/g, "");
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


      formData.append("nom", form.value.nom);
      formData.append("fiche", this.appareil.fiche);
      formData.append("certificat", this.appareil.certificat);

      formData.append("code", code);
      formData.append("status", form.value.status);
      formData.append("etat", form.value.etat);



      // if ($('#select').select2().val()) {

      //   if (typeof $('#select').select2().val().split(':')[1] === 'string') {

      //     form.value.categorieId = $('#select').select2().val().split(':')[1].trim();

      //   }
      //   else {
      //     form.value.categorieId = Number($('#select').select2().val().split(':')[1]);

      //   }
      // }
      // if ($('#select2').select2().val()) {

      //   if (typeof $('#select2').select2().val().split(':')[1] === 'string') {

      //     form.value.stockId = $('#select2').select2().val().split(':')[1].trim();

      //   }
      //   else {
      //     form.value.stockId = Number($('#select2').select2().val().split(':')[1]);

      //   }
      // }
      formData.append("categorieId", form.value.categorieId);
      formData.append("stockId", form.value.stockId);
      formData.append("marque", form.value.marque);
      formData.append("reference", form.value.reference);
      if (form.value.numero_serie) {
        formData.append("numero_serie", form.value.numero_serie);
      }

      formData.append("remarques", form.value.remarques);
      if (form.value.matricule) {
        formData.append("matricule", form.value.matricule);
      }
      if (form.value.frequence) {
        formData.append("frequence", form.value.frequence);
      }
      formData.append("fournisseur", form.value.fournisseur);

      if (this.jsDate) {
        formData.append("dernier_etalonnage", this.jsDate);
      }

      this.adding = true;
      if (!form.value.categorieId) {
        this.errorCategorie = true;
      }
      if (!form.value.stockId) {
        this.errorStock = true;
      }

      else {


        this.appareilService.addAparreil(formData).subscribe(
          appareilData => {

            if (appareilData.success) {
              {
                this.adding = false;
                this.flashService.show("Appareil ajoutée", {
                  cssClass: "alert-success",
                  timeout: 3000
                });
                // form.reset();
                this.router.navigate(["/appareils"]);
              }
            }
          },
          error => {
            this.adding = false;
            if (error.error.error === "Valeurs en double entrées") {
              this.adding = false;
              alert('Appareil avec ce code déja ajouté')
              // this.flashService.show("Appareil avec ce code déja ajouté !", {
              //   cssClass: "alert-danger",
              this.adding = false;
              //   timeout: 4000
              // });
            }

            else {
              this.adding = false;
              if (error.error.error === "Format d'image invalide !") {
                this.errorPhoto = true;
                this.adding = false;
              }
              if (error.error.error === "Format de fiche technique invalide !") {
                this.errorFiche = true;
                this.adding = false;

              }
              if (error.error.error === "Format de certificat invalide !") { this.errorCertificat = true; }

            }
          }
        );
      }

    } else {
      this.adding = false;
      this.flashService.show("Merci d'entrer les champs qui sont obligatoires !", {
        cssClass: "alert-danger",
        timeout: 4000
      });
      if (!form.value.code) {
        this.errorCode = true;

      }
      if (!form.value.nom) {
        this.errorNom = true;

      }
      if (!form.value.etat) {
        this.errorEtat = true;

      }
      if (!form.value.status) {
        this.errorStatut = true;

      }
      if (!form.value.categorieId) {
        this.errorCategorie = true;

      }
      if (!form.value.stockId) {
        this.errorStock = true;

      }
      // if (!$('#select').select2().val()) {

      //   this.errorCategorie = true;



      // }
      // else {

      //   this.errorCategorie = false;
      // }
      // if (!$('#select2').select2().val()) {
      //   this.errorStock = true;


      // } else {
      //   this.errorStock = false;

      // }
    }
  }
  getToday(): string {

    return new Date().toISOString().split('T')[0]
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
    // $("#select").select2(

    // )
    // $('#select').on("select2:select", function (e) {
    //   this.errorCategorie = false;
    // });
    // $("#select2").select2(

    // )
    // $('#select2').on("select2:select", function (e) {
    //   this.errorStock = false;
    // });
    this.categorieService.getCategories().subscribe(categories => {
      this.categories = categories.data;
      console.log(this.categories);

    })
    this.stockService.getStocks().subscribe(stockData => {
      this.stocks = stockData.data;

    });
    $("#datepicker").keypress(function (event) { event.preventDefault(); });



  }
  setCategorie(ev) {
    this.categorieId = ev;
  }
  // setErrorCategorie() {
  //   if (!this.indice) {
  //     this.errorCategorie = true
  //   }

  // }
  // setErrorStock() {
  //   if (!this.indice2) {
  //     this.errorStock = true
  //   }

  // }


  setStock(ev) {
    this.stockId = ev;
    // this.errorStock = false;
    // if (ev) {
    //   this.indice2 = true;
    // }
  }
  showDate(ev) {

  }
  setStatut(ev) {
    this.status = ev;
  }
  setEtat(ev) {
    this.etat = ev;
  }





}


