import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Categorie } from "../../models/categorie";
import { AppareilService } from "../../services/appareil.service";
import { SousEquipementsService } from "../../services/sous-equipement.service";
import { Appareil } from "../../models/appareils";
import { Observable } from "rxjs";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Sous_equipement } from "src/app/models/sous_equipements";
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;
@Component({
  selector: "app-edit-sous-equipement",
  templateUrl: "./edit-sous-equipement.component.html",
  styleUrls: ["./edit-sous-equipement.component.css"]
})
export class EditSousEquipementComponent implements OnInit {
  id: string = "";
  sous_equipement: Sous_equipement = {
    id: "",
    nom: "",
    code: "",
    marque: "",
    image: "",
    status: "",
    etat: "",
    appareilId: "",
    appareil_nom: "",
    reference: "",
    nombre: null
  };
  appareilId: string;
  appareil_nom: string;
  status: string;
  etat: string;
  appareils: any[];

  errorNom = false;
  valueNom = false;
  errorCode = false;
  valueCode = false;
  errorPhoto: boolean;
  adding: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appareilService: AppareilService,
    private flashMessage: FlashMessagesService,
    private sous_equipementsService: SousEquipementsService,
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
    this.id = this.route.snapshot.params["id"];
    $("#select").select2(

    )

    this.sous_equipementsService
      .getSousEquipement(this.id)
      .subscribe(sous_equipement => {
        this.sous_equipement = sous_equipement.data;

      });

    this.appareilService.getAppareils().subscribe(appareilData => {
      this.appareils = appareilData.data;

    });
  }
  selectphoto(event) {
    if (event.target.files.length > 0) {
      this.sous_equipement.image = event.target.files;
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
  onEditSous_equipement({
    value,
    valid
  }: {
    value: Sous_equipement;
    valid: boolean;
  }) {

    value.appareilId = this.appareilId;

    value.status = this.status;
    value.etat = this.etat;
    value.appareil_nom = this.appareil_nom;
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

      if (this.sous_equipement.image) {

        for (let photo of this.sous_equipement.image) {
          formData.append("photos", photo);
        }
      }


      if ($('#select').select2().val()) {
        if (typeof $('#select').select2().val().split(':')[1] === 'string') {

          value.appareilId = $('#select').select2().val().split(':')[1].trim();
        }
        else {
          value.appareilId = Number($('#select').select2().val().split(':')[1]);
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
      this.appareilService.getAppareil(value.appareilId).subscribe(appareil => {

        this.sous_equipementsService.editSousEquipement2(this.id, { appareil_nom: appareil.data[0].nom }).subscribe()
      })

      formData.append("reference", value.reference);
      if (value.nombre === null) {
        formData.append("nombre", "");
      } else {
        formData.append("nombre", value.nombre);
      }

      formData.append("marque", value.marque);
      this.adding = true;
      this.sous_equipementsService
        .editSousEquipement(this.id, formData)
        .subscribe(sous_equipement => {

          if (sous_equipement.success) {
            this.adding = false;

            this.router.navigate(["/accessoires"]);
          }
        }, error => {
          this.adding = false;
          if (error.error.error === "Valeurs en double entrées") {
            this.adding = false;
            this.flashMessage.show("Accessoire avec ce code déja ajouté", {
              cssClass: "alert-danger",
              timeout: 3000
            });
          }
          // alert(error.error.error);


          else if (error.error.error === "Format d'image invalide !") {
            this.flashMessage.show("Format d'image invalide !", {
              cssClass: "alert-danger",
              timeout: 3000
            });
            this.errorPhoto = true;
            this.adding = false;
          } else {
            this.flashMessage.show(error.error.error, {
              cssClass: "alert-danger",
              timeout: 3000
            })
          }
        }

        );
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
  setAppareil(ev) {
    this.appareilId = ev;
    console.log(ev);
    this.appareilService.getAppareil(ev).subscribe(appareil => {
      this.appareil_nom = appareil.data[0].nom;
      console.log(appareil.data[0].nom);



    });
  }
  setStatut(ev) {
    this.status = ev;
  }
  setEtat(ev) {
    this.etat = ev;
  }
}
