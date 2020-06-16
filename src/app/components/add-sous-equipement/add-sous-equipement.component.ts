import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Appareil } from "../../models/appareils";
import { Sous_equipement } from "../../models/sous_equipements";
import { AppareilService } from "../../services/appareil.service";
import { SousEquipementsService } from "../../services/sous-equipement.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import 'select2';
declare var $: any;
@Component({
  selector: "app-add-sous-equipement",
  templateUrl: "./add-sous-equipement.component.html",
  styleUrls: ["./add-sous-equipement.component.css"]
})
export class AddSousEquipementComponent implements OnInit {
  sous_equipement: Sous_equipement = {
    id: "",
    nom: "",
    code: "",
    marque: "",
    image: [],
    status: "",
    etat: "",
    appareilId: "",
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
  selected;
  photo;
  valueAppareil = false;
  errorPhoto = false;
  appareilId: string;
  status: string;
  etat: string;
  appareils: any[];
  indice = false;
  adding: boolean = false;
  errorAppareil: boolean;

  constructor(
    private appareilService: AppareilService,
    private sousEquipementsService: SousEquipementsService,
    private flashService: FlashMessagesService,
    private router: Router,
    public authService: AuthService
  ) {

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
    this.appareilService.getAppareils().subscribe(appareilData => {
      this.appareils = appareilData.data;
      // appareilData.data.forEach(element => {
      //   this.appareils.push(element.id);
      // })
      $("#select").select2(

      )


    });
    $('#select').on("select2:select", function (e) {

      this.selected = true;
      this.errorAppareil = false;
    });


  }


  selectphoto(event) {


    if (event.target.files.length > 0) {
      this.sous_equipement.image = event.target.files;

      Array.prototype.forEach.call(event.target.files, element => {
        this.photo = element;
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
  clickAppareil(ev) {
    this.errorAppareil = false;
  }
  onAddSousEquipement(form: NgForm) {
    this.adding = true;
    if (form.valid) {

      let error;
      const formData = new FormData();
      for (let photo of this.sous_equipement.image) {
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
      if ($('#select').select2().val()) {
        if (typeof $('#select').select2().val().split(':')[1] === 'string') {
          console.log('string');
          form.value.appareilId = $('#select').select2().val().split(':')[1].trim();
        }
        else {
          form.value.appareilId = Number($('#select').select2().val().split(':')[1]);
        }
      }




      form.value.status = this.status;
      form.value.etat = this.etat;
      formData.append("appareilId", form.value.appareilId);
      formData.append("status", form.value.status);
      formData.append("etat", form.value.etat);
      formData.append("nom", form.value.nom);
      formData.append("code", code);
      formData.append("reference", form.value.reference);
      formData.append("marque", form.value.marque);

      if (!form.value.appareilId) {
        this.errorAppareil = true;
      } else {
        this.sousEquipementsService.addSousEquipements(formData).subscribe(
          appareilData => {
            if (appareilData.success) {




              this.router.navigate(['/accessoires']);

            }
          },
          error => {
            this.adding = false;
            if (error.error.error === "Valeurs en double entrées") {
              this.adding = false;
              this.flashService.show("Accessoire avec ce code déja ajouté", {
                cssClass: "alert-danger",
                timeout: 3000
              });
            } else if (error.error.error === "Format d'image invalide !") {
              this.flashService.show("Format d'image invalide !", {
                cssClass: "alert-danger",
                timeout: 3000
              });
              this.adding = false;
              this.errorPhoto = true;
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
      }

    } else {
      this.adding = false;
      this.flashService.show("Merci d'entrer les champs qui sont obligatoires !", {
        cssClass: "alert-danger",
        timeout: 4000
      });
      if (!form.value.code) {
        this.errorCode = true;
        this.adding = false;

      }
      if (!form.value.nom) {
        this.errorNom = true;
        this.adding = false;

      }
      if (!form.value.etat) {
        this.errorEtat = true;
        this.adding = false;
      }
      if (!form.value.status) {
        this.errorStatut = true;
        this.adding = false;
      }

      if (!$('#select').select2().val()) {
        this.errorAppareil = true;

      }


    }
  }


  setAppareil(ev) {


  }
  setStatut(ev) {

    this.status = ev;
  }
  setEtat(ev) {
    this.etat = ev;
  }
}
