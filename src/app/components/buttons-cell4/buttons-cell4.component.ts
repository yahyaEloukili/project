import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ICellRendererAngularComp, AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { SousEquipementsService } from 'src/app/services/sous-equipement.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-buttons-cell4',
  templateUrl: './buttons-cell4.component.html',
  styleUrls: ['./buttons-cell4.component.css']
})
export class ButtonsCell4omponent implements OnInit, ICellRendererAngularComp {
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
  onClickEdit(ev) {

    this.router.navigate([`/editZone/${this.cellValue}`]);

  }

}
