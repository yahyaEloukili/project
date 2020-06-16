import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ICellRendererAngularComp, AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AppareilService } from 'src/app/services/appareil.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-buttons-cell',
  templateUrl: './buttons-cell.component.html',
  styleUrls: ['./buttons-cell.component.css']
})
export class ButtonsCellComponent implements OnInit, ICellRendererAngularComp {
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
  onClickEdit(ev) {

    this.router.navigate([`/appareil/${this.cellValue}`]);

  }
  onDetailClicked(ev) {
    {
      this.router.navigate([`/appareilDetail/${this.cellValue}`]);

    }
  }
}
