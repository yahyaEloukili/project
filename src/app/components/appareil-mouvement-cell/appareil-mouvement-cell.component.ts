import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AppareilService } from "../../services/appareil.service";
@Component({
  selector: 'app-appareil-mouvement-cell',
  templateUrl: './appareil-mouvement-cell.component.html',
  styleUrls: ['./appareil-mouvement-cell.component.css']
})
export class AppareilMouvementCellComponent implements OnInit, ICellRendererAngularComp {
  cellValue;
  appareil: any;

  constructor(private appareilService: AppareilService) { }

  ngOnInit(): void {

  }
  agInit(params: any) {

    this.cellValue = params.value;
    this.appareilService.getAppareil(this.cellValue).subscribe(appareil => {
      if (appareil && appareil.data) {
        this.appareil = appareil.data[0].nom;
      }

    })

  }
  refresh(params: any): boolean {
    this.cellValue = params.value;
    this.appareilService.getAppareil(this.cellValue).subscribe(appareil => {
      if (appareil && appareil.data) {
        this.appareil = appareil.data[0].nom;
      }

    })

    return true;
  }
}
