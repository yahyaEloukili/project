import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AppareilService } from "../../services/appareil.service";

@Component({
  selector: 'app-appareil-code-mouvement-cell',
  templateUrl: './appareil-code-mouvement-cell.component.html',
  styleUrls: ['./appareil-code-mouvement-cell.component.css']
})
export class AppareilCodeMouvementCellComponent implements OnInit {

  cellValue;
  appareil: any;

  constructor(private appareilService: AppareilService) { }

  ngOnInit(): void {

  }
  agInit(params: any) {

    this.cellValue = params.value;
    this.appareilService.getAppareil(this.cellValue).subscribe(appareil => {
      this.appareil = appareil.data[0].code;

    })

  }
  refresh(params: any): boolean {
    this.cellValue = params.value;
    this.appareilService.getAppareil(this.cellValue).subscribe(appareil => {
      this.appareil = appareil.data[0].code;

    })

    return true;
  }

}
