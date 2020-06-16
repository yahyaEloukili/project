import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Sous_equipement } from "../../models/sous_equipements";
import { Categorie } from "../../models/categorie";
import { Stock } from "../../models/stock";
import { SousEquipementsService } from "../../services/sous-equipement.service";
import { AppareilService } from "../../services/appareil.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { prod } from "../../prod/prod";
@Component({
  selector: 'app-accessoires-detail',
  templateUrl: './accessoires-detail.component.html',
  styleUrls: ['./accessoires-detail.component.css']
})
export class AccessoiresDetailComponent implements OnInit {
  id: string = "";
  sous_equipement: Sous_equipement = {
    id: "",
    nom: "",
    code: "",
    marque: "",
    image: ["h"],
    status: "",
    etat: "",
    appareilId: "",
    appareil_nom: "",
    reference: "",
    nombre: null
  };
  src1; src2; src3; src4; src5;
  constructor(
    private sousEquipementsService: SousEquipementsService,
    private appareilService: AppareilService,
    private flashService: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private prod: prod
  ) { }
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
    this.id = this.route.snapshot.params["id"];
    this.sousEquipementsService.getSousEquipement(this.id).subscribe(sous_equipement => {
      this.appareilService.getAppareil(sous_equipement.data[0].appareilId).subscribe(appareil => {
        sous_equipement.data[0].appareil_nom = appareil.data[0].nom;
        sous_equipement.data[0].code = appareil.data[0].code;

      })
      this.sous_equipement = sous_equipement.data;


      this.src1 = `${this.prod.link2}/uploads/` + this.sous_equipement[0].image[0];

      this.src2 = `${this.prod.link2}/uploads/` + this.sous_equipement[0].image[1];
      this.src3 = `${this.prod.link2}/uploads/` + this.sous_equipement[0].image[2];
      this.src4 = `${this.prod.link2}/uploads/` + this.sous_equipement[0].image[3];
      this.src5 = `${this.prod.link2}/uploads/` + this.sous_equipement[0].image[4];

    });





  }


}
