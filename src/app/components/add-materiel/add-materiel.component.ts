import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { Materiel } from "../../models/materiel";
import { Categorie } from "../../models/categorie";
import { Stock } from "../../models/stock";
import { MaterielService } from "../../services/materiel.service";
import { CategorieService } from "../../services/categorie.service";
import { StockService } from "../../services/stock.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import "rxjs/add/operator/catch";
import { Sous_equipement } from "src/app/models/sous_equipements";
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
  selector: "app-add-materiel",
  templateUrl: "./add-materiel.component.html",
  styleUrls: ["./add-materiel.component.css"]
})
export class AddMaterielComponent implements OnInit {
  // @ViewChild("file") file: ElementRef;
  materiel: Materiel = {
    id: "",
    nom: "",
    code: "",
    marque: "",
    image: [],
    status: "",
    etat: "",
    reference: "",
    nombre: null
  };
  // @Input() exampleData = ['yahya']
  status: string;
  etat: string;
  exempledata = ['yahya', 'ahmed', 'nada'];
  errorNom = false;
  valueNom = false;
  errorCode = false;
  valueCode = false;
  errorEtat = false;
  valueEtat = false;
  errorStatut = false;
  valueStatut = false;
  errorPhoto = false;
  adding: boolean = false;
  constructor(
    private materielService: MaterielService,
    private categorieService: CategorieService,
    private stockService: StockService,
    private flashService: FlashMessagesService,
    public authService: AuthService,
    private router: Router
  ) { }


  selectImage(event) {
    if (event.target.files.length > 0) {
      this.materiel.image = event.target.files;
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

  selectphoto(event) {
    if (event.target.files.length > 0) {
      this.materiel.image = event.target.files;
    }

  }
  onAddMateriel(form: NgForm) {
    this.adding = true;
    let error;
    if (form.valid) {
      let error;
      const formData = new FormData();
      for (let photo of this.materiel.image) {
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
      form.value.status = this.status;
      form.value.etat = this.etat;
      formData.append("status", form.value.status);
      formData.append("etat", form.value.etat);
      formData.append("nom", form.value.nom);
      formData.append("code", code);
      formData.append("reference", form.value.reference);
      formData.append("nombre", form.value.nombre);
      formData.append("marque", form.value.marque);
      this.materielService.addMateriel(formData).subscribe(
        materielData => {
          if (materielData.success) {
            this.adding = false;

            this.router.navigate(['/materiel']);
          }
        },
        error => {
          this.adding = false;
          if (error.error.error === "Valeurs en double entrées") {
            this.adding = false;
            this.flashService.show("materiel avec ce code déja ajouté", {
              cssClass: "alert-danger"
            });
          } else if (error.error.error === "Format d'image invalide !") {
            this.flashService.show("Format d'image invalide !", {
              cssClass: "alert-danger",
              timeout: 3000
            });
            this.errorPhoto = true;
            this.adding = false;
          }
          else {
            this.adding = false;
            this.flashService.show(error.error.error, {
              cssClass: "alert-danger",
              timeout: 3000
            });
          }
        }
      );
    } else {
      this.adding = false;
      if (!form.value.code) {
        this.errorCode = true;
        this.adding = false;

      }
      if (!form.value.nom) {
        this.adding = false;
        this.errorNom = true;

      }
      if (!form.value.etat) {
        this.adding = false;
        this.errorEtat = true;

      }
      if (!form.value.status) {
        this.errorStatut = true;

      }
    }
  }

  // onFileChange(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.image = file;
  //   }
  // }
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
  }

  setstatus(ev) {
    this.status = ev;
  }
  setEtat(ev) {
    this.etat = ev;
  }
}
