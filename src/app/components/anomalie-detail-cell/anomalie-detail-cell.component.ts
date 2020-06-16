// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-anomalie-detail-cell',
//   templateUrl: './anomalie-detail-cell.component.html',
//   styleUrls: ['./anomalie-detail-cell.component.css']
// })
// export class AnomalieDetailCellComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ICellRendererAngularComp, AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { SousEquipementsService } from 'src/app/services/sous-equipement.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-anomalie-detail-cell',
  templateUrl: './anomalie-detail-cell.component.html',
  styleUrls: ['./anomalie-detail-cell.component.css']
})
export class AnomalieDetailCellComponent implements OnInit, ICellRendererAngularComp {
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

    this.router.navigate([`/anomalieDetail/${this.cellValue}`]);

  }
}

