
import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AppareilService } from "../../services/appareil.service";
@Component({
  selector: 'app-anomalie-appareil-cell',
  templateUrl: './anomalie-appareil-cell.component.html',
  styleUrls: ['./anomalie-appareil-cell.component.css']
})
export class AnomalieAppareilCellComponent implements OnInit, ICellRendererAngularComp {
  cellValue;
  appareil: any;

  constructor(private appareilService: AppareilService) { }

  ngOnInit(): void {

  }
  agInit(params: any) {

    this.cellValue = params.value;
    this.appareilService.getAppareil(this.cellValue).subscribe(appareil => {
      this.appareil = appareil.data[0].nom;

    })

  }
  refresh(params: any): boolean {
    this.cellValue = params.value;
    this.appareilService.getAppareil(this.cellValue).subscribe(appareil => {
      this.appareil = appareil.data[0].nom;

    })

    return true;
  }
}
