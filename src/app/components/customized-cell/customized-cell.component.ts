import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-customized-cell',
  templateUrl: './customized-cell.component.html',
  styleUrls: ['./customized-cell.component.css']
})
export class CustomizedCellComponent implements OnInit, ICellRendererAngularComp {
  cellValue;
  constructor() { }

  ngOnInit(): void {

  }
  agInit(params: any) {

    this.cellValue = params.value;

  }
  refresh(params: any): boolean {
    this.cellValue = params.value;

    return true;
  }
  click(ev) {

  }

}
