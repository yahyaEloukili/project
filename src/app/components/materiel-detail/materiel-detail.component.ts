import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Materiel } from "../../models/materiel";
import { Stock } from "../../models/stock";
import { MaterielService } from "../../services/materiel.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { prod } from "../../prod/prod";
@Component({
  selector: 'app-materiel-detail',
  templateUrl: './materiel-detail.component.html',
  styleUrls: ['./materiel-detail.component.css']
})
export class MaterielDetailComponent implements OnInit {
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

  src1; src2; src3; src4; src5;
  constructor(private materielService: MaterielService,
    private flashService: FlashMessagesService,
    private router: Router,
    public authService: AuthService,
    private prod: prod,
    private route: ActivatedRoute) { }
  onLogoutClick() {
    this.authService.logout();
    // this.authService.setAuth(false);
    // this.authorized = this.authService.auth;

    this.router.navigate(["/login"]);
    return false;
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log(this.id);
    this.materielService.getMateriel(this.id).subscribe(materiel => {
      this.materiel = materiel.data;
      this.src1 = `${this.prod.link2}/uploads/` + this.materiel[0].image[0];


      this.src2 = `${this.prod.link2}/uploads/` + this.materiel[0].image[1];
      this.src3 = `${this.prod.link2}/uploads/` + this.materiel[0].image[2];
      this.src4 = `${this.prod.link2}/uploads/` + this.materiel[0].image[3];

      this.src5 = `${this.prod.link2}/uploads/` + this.materiel[0].image[4];

    });

  }

}
