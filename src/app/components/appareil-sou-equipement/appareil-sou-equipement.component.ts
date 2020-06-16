// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-appareil-sou-equipement',
//   templateUrl: './appareil-sou-equipement.component.html',
//   styleUrls: ['./appareil-sou-equipement.component.css']
// })
// export class AppareilSouEquipementComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AppareilService } from "../../services/appareil.service";
@Component({
  selector: 'app-appareil-sou-equipement',
  templateUrl: './appareil-sou-equipement.component.html',
  styleUrls: ['./appareil-sou-equipement.component.css']
})
export class AppareilSouEquipementComponent implements OnInit, ICellRendererAngularComp {
  cellValue;
  appareil;
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
  click(ev) {
    console.log(this.cellValue);
  }

}
