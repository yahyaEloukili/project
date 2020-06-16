// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-materiel-etat-cell',
//   templateUrl: './materiel-etat-cell.component.html',
//   styleUrls: ['./materiel-etat-cell.component.css']
// })
// export class MaterielEtatCellComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-materiel-etat-cell',
  templateUrl: './materiel-etat-cell.component.html',
  styleUrls: ['./materiel-etat-cell.component.css']
})
export class MaterielEtatCellComponent implements OnInit, ICellRendererAngularComp {
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
