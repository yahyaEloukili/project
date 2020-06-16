import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-customized-cell2',
  templateUrl: './customized-cell2.component.html',
  styleUrls: ['./customized-cell2.component.css']
})
export class CustomizedCell2Component implements OnInit, ICellRendererAngularComp {
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
    console.log(this.cellValue);
  }

}
