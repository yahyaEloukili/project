import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ICellRendererAngularComp, AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-buttons-cell5',
  templateUrl: './buttons-cell5.component.html',
  styleUrls: ['./buttons-cell5.component.css']
})
export class ButtonsCell5omponent implements OnInit, ICellRendererAngularComp {
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;

  cellValue;
  constructor(private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {

  }
  agInit(params: any) {

    this.cellValue = params.value;

  }
  refresh(params: any): boolean {
    this.cellValue = params.value;

    return true;
  }
  onClickEdit(ev) {

    this.router.navigate([`/editStock/${this.cellValue}`]);

  }

}
