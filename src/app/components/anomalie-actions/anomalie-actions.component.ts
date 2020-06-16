import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ICellRendererAngularComp, AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AppareilService } from 'src/app/services/appareil.service';
import { AnomaliesService } from 'src/app/services/anomalies.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-anomalie-actions',
  templateUrl: './anomalie-actions.component.html',
  styleUrls: ['./anomalie-actions.component.css']
})
export class AnomalieActionsComponent implements OnInit, ICellRendererAngularComp {
  read: boolean = false;
  valide: boolean = false;
  annule: boolean = false;
  anomalie: any;
  cellValue;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private appareilService: AppareilService,
    private anomaliesService: AnomaliesService,
    private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
    // console.log(this.read, this.valide, this.annule);

  }
  agInit(params: any) {

    this.cellValue = params.value;

    this.anomaliesService.getAnomalie(this.cellValue).subscribe(anomalie => {
      this.anomalie = anomalie;
      if (this.anomalie.data[0].read && this.anomalie.data[0].valide) {
        this.read = true;
        this.valide = true;
      } else if (this.anomalie.data[0].read && this.anomalie.data[0].annule) {
        this.read = true;
        this.annule = true;
      }
      else {
        this.read = false;
      }

    })

  }
  refresh(params: any): boolean {
    this.cellValue = params.value;
    this.anomaliesService.getAnomalie(this.cellValue).subscribe(anomalie => {
      this.anomalie = anomalie;
      if (this.anomalie.data[0].read && this.anomalie.data[0].valide) {
        this.read = true;
        this.valide = true;
      } else if (this.anomalie.data[0].read && this.anomalie.data[0].annule) {
        this.read = true;
        this.annule = true;
      }
      else {
        this.read = false;
      }

    })

    return true;
  }
  onValidCliecked(ev) {
    this.read = true;
    this.valide = true;

    this.anomaliesService.updateAnomalie(this.cellValue, { valide: true, read: true }).subscribe(anomalie => {
      this.anomalie = anomalie;
      this.appareilService.editAppareil2(this.anomalie.data.appareilId, { etat: this.anomalie.data.etat }).subscribe(appareil => {

      })
    })

  }
  onCancelClicked(ev) {
    this.read = true;
    this.annule = true;
    this.anomaliesService.updateAnomalie(this.cellValue, { annule: true, read: true }).subscribe(anomalie => {

    })
  }

}
