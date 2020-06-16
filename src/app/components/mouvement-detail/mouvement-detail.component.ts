import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { MouvementsService } from "../../services/mouvements.service";
import { SousEquipementsService } from "../../services/sous-equipement.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { MaterielService } from 'src/app/services/materiel.service';
import { prod } from "../../prod/prod";

@Component({
  selector: 'app-mouvement-detail',
  templateUrl: './mouvement-detail.component.html',
  styleUrls: ['./mouvement-detail.component.css']
})
export class MouvementDetailComponent implements OnInit {
  mouvements: any;
  id;
  src: string;
  src2: string

  valideAccessoire: boolean;
  annuleAccessoire: boolean;
  valideMateriel: boolean;
  rowModelType;
  annuleMateriel: boolean;
  hiddenMateriel: Boolean = true;
  hiddenAccessoires: Boolean = true;
  accessoire1;

  ;
  constructor(private mouvementsService: MouvementsService, private prod: prod, private materielService: MaterielService, public authService: AuthService, private router: Router, private sousEquipementsService: SousEquipementsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];



    this.mouvementsService.getMouvementDetail(this.id).subscribe(detail => {

      this.mouvements = detail.data;
      if (detail.data.piece_rechanges.length !== 0) {
        this.hiddenMateriel = false;
      }
      if (detail.data.sous_equipements.length !== 0) {
        this.hiddenAccessoires = false;
      }



      this.src = `${this.prod.link2}/uploads/` + this.mouvements?.imagesEtat[0];
      this.src2 = `${this.prod.link2}/uploads/` + this.mouvements?.Depot?.imagesEtat[0];

    })
  }
  onValidateClicked(ev, statut, id2) {
    if (statut === 'Defaillant') {
      this.sousEquipementsService.editSousEquipement2(ev, { etat: 'Mauvais etat' }).subscribe();
    }
    if (statut === 'Bon etat') {
      this.sousEquipementsService.editSousEquipement2(ev, { etat: 'Bon etat' }).subscribe();
    }
    if (statut === 'manquante') {
      this.sousEquipementsService.editSousEquipement2(ev, { status: 'Manquant' }).subscribe();
    }
    this.mouvementsService.updateSeqMouvement(id2, ev, { valide: true }).subscribe(() => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['mouvementDetail', this.id]);
      });
    });





  }

  onCancelClicked(ev, id2) {


    this.mouvementsService.updateSeqMouvement(id2, ev, { annule: true }).subscribe(() => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['mouvementDetail', this.id]);
      });
    });





  }

  onValidateClicked2(ev, statut, id2) {
    if (statut === 'Defaillant') {
      this.materielService.editMateriel2(ev, { etat: 'Mauvais etat' }).subscribe();
    }
    if (statut === 'Bon etat') {
      this.materielService.editMateriel2(ev, { etat: 'Bon etat' }).subscribe();
    }
    if (statut === 'manquante') {
      this.materielService.editMateriel2(ev, { status: 'Manquant' }).subscribe();
    }
    this.mouvementsService.updatePieceMouvement(id2, ev, { valide: true }).subscribe(() => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['mouvementDetail', this.id]);
      });
    });



  }

  onCancelClicked2(ev, id2) {

    this.mouvementsService.updatePieceMouvement(id2, ev, { annule: true }).subscribe(() => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['mouvementDetail', this.id]);
      });

    });



  }

}
