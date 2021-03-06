import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Materiel } from "../../models/materiel";

import { MaterielService } from "../../services/materiel.service";

import { Observable } from "rxjs";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Sous_equipement } from "src/app/models/sous_equipements";
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-edit-materiel',
  templateUrl: './edit-materiel.component.html',
  styleUrls: ['./edit-materiel.component.css']
})
export class EditMaterielComponent implements OnInit {
  id: string = "";
  materiel: Materiel = {
    id: "",
    nom: "",
    code: "",
    marque: "",
    image: [],
    status: "",
    etat: "",
    appareilId: "",
    appareil_nom: "",
    reference: "",
    nombre: null
  };

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
  status: string;
  etat: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private materielService: MaterielService,
    public authService: AuthService,
    private flashMessage: FlashMessagesService) { }
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
    this.id = this.route.snapshot.params["id"];
    this.materielService
      .getMateriel(this.id)
      .subscribe(materiel => {
        this.materiel = materiel.data;

      });

  }
  selectphoto(event) {
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
  onEditMateriel({
    value,
    valid
  }: {
    value: Materiel;
    valid: boolean;
  }) {

    this.adding = true;
    value.status = this.status;
    value.etat = this.etat;

    if (valid) {
      this.id = this.route.snapshot.params["id"];
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
      const formData = new FormData();

      if (this.materiel.image) {

        for (let photo of this.materiel.image) {
          formData.append("photos", photo);
        }
      }
      if (value.appareilId) {
        formData.append("appareilId", value.appareilId);
      }
      if (value.status) {
        formData.append("status", value.status);
      }
      if (value.etat) {
        formData.append("etat", value.etat);
      }
      formData.append("nom", value.nom);
      formData.append("code", code);
      formData.append("reference", value.reference);
      formData.append("nombre", value.nombre);
      formData.append("marque", value.marque);

      this.materielService
        .editMateriel(this.id, formData)
        .subscribe(sous_equipement => {
          if (sous_equipement.success) {
            this.adding = false;

            this.router.navigate(["/materiel"]);
          }
        }, error => {
          this.adding = false;
          if (error.error.error === "Valeurs en double entrées") {
            this.adding = false;
            this.flashMessage.show("Materiel avec ce code déja ajouté", {
              cssClass: "alert-danger",
              timeout: 3000
            });
          }
          else if (error.error.error === "Format d'image invalide !") {
            this.flashMessage.show("Format d'image invalide !", {
              cssClass: "alert-danger",
              timeout: 3000
            });
            this.errorPhoto = true;
            this.adding = false;
          } else {
            this.adding = false;
            this.flashMessage.show(error.error.error, {
              cssClass: "alert-danger",
              timeout: 3000
            })
          }
        }

        );
    } else {
      this.adding = false;
      if (!value.code) {
        this.errorCode = true;
        this.adding = false;
      }
      if (!value.nom) {
        this.errorNom = true;
        this.adding = false;
      }
      if (!value.etat) {
        this.errorEtat = true;
        this.adding = false;

      }
      if (!value.status) {
        this.errorStatut = true;
        this.adding = false;

      }
    }
  }
  setStatut(ev) {
    this.status = ev;
  }
  setEtat(ev) {
    this.etat = ev;
  }
}
