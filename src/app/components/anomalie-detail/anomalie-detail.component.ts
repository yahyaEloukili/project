import { Component, OnInit } from '@angular/core';
import { AnomaliesService } from "../../services/anomalies.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { prod } from "../../prod/prod";
@Component({
  selector: 'app-anomalie-detail',
  templateUrl: './anomalie-detail.component.html',
  styleUrls: ['./anomalie-detail.component.css']
})
export class AnomalieDetailComponent implements OnInit {

  anomalie: any;
  id;
  src: string;
  src2: string
  hiddenAppareil: Boolean = true;
  hiddenEtat: Boolean = true;
  hiddenImage: Boolean = true;
  hiddenImageComment: Boolean = true;

  hiddenUser: Boolean = true;
  hiddenComment: Boolean = true;
  hiddenDate: Boolean = true;
  constructor(private anomaliesService: AnomaliesService, private prod: prod, private router: Router, public authService: AuthService,
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


    this.anomaliesService.getAnomalie(this.id).subscribe(detail => {
      this.anomalie = detail.data[0];
      console.log(this.anomalie);
      if (this.anomalie.etat) {
        this.hiddenEtat = false;
      }
      if (this.anomalie.commentaire) {
        this.hiddenEtat = false;
      }
      if (this.anomalie.appareilId) {
        this.hiddenAppareil = false;
      }
      if (this.anomalie.commentaire) {
        this.hiddenComment = false;
      }
      if (this.anomalie.createdAt) {
        this.hiddenDate = false;
      }
      if (this.anomalie.image[0]) {
        this.hiddenImage = false;
      }
      if (!this.anomalie.image[0]) {
        this.hiddenImageComment = false;
      }
      if (this.anomalie.userId) {
        this.hiddenUser = false;
      }


      this.src = `${this.prod.link2}/uploads/` + this.anomalie?.image[0];


    })
  }
}
