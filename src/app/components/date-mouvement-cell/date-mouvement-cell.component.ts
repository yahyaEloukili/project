import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ZoneService } from "../../services/zone.service";


@Component({
  selector: 'app-date-mouvement-cell',
  templateUrl: './date-mouvement-cell.component.html',
  styleUrls: ['./date-mouvement-cell.component.css']
})
export class DateMouvementCellComponent implements OnInit {

  cellValue;
  zone: any;

  constructor(private zoneService: ZoneService) { }

  ngOnInit(): void {

  }
  agInit(params: any) {

    this.cellValue = params.value;



  }
  refresh(params: any): boolean {
    this.cellValue = params.value;


    return true;
  }

}
