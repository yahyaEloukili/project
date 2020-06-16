// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-cloture',
//   templateUrl: './cloture.component.html',
//   styleUrls: ['./cloture.component.css']
// })
// export class ClotureComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ICellRendererAngularComp, AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AppareilService } from 'src/app/services/appareil.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-buttons-cell',
  templateUrl: './cloture.component.html',
  styleUrls: ['./cloture.component.css']
})
export class ClotureComponent implements OnInit, ICellRendererAngularComp {
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;

  cellValue;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private appareilService: AppareilService,
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


}
