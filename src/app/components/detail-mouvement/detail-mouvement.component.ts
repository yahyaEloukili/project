import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ICellRendererAngularComp, AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { SousEquipementsService } from 'src/app/services/sous-equipement.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-detail-mouvement',
  templateUrl: './detail-mouvement.component.html',
  styleUrls: ['./detail-mouvement.component.css']
})
export class DetailMouvementComponent implements OnInit, ICellRendererAngularComp {
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;

  cellValue;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private sousEquipementsService: SousEquipementsService,
    private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {

  }
  agInit(params: any) {

    this.cellValue = params.value;

  }
  refresh(params: any): boolean {
    this.cellValue = params.value;

    return true;
  }
  onClickDetail(ev) {

    this.router.navigate([`/mouvementDetail/${this.cellValue}`]);

  }
}
