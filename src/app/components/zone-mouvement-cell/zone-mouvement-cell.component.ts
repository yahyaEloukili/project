import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ZoneService } from "../../services/zone.service";


@Component({
  selector: 'app-zone-mouvement-cell',
  templateUrl: './zone-mouvement-cell.component.html',
  styleUrls: ['./zone-mouvement-cell.component.css']
})
export class ZoneMouvementCellComponent implements OnInit {

  cellValue;
  zone: any;

  constructor(private zoneService: ZoneService) { }

  ngOnInit(): void {

  }
  agInit(params: any) {

    this.cellValue = params.value;
    if (this.cellValue !== 'Stock') {
      this.zoneService.getZone(this.cellValue).subscribe(zone => {
        this.zone = zone.data.nom;

      })
    }

  }
  refresh(params: any): boolean {
    this.cellValue = params.value;
    if (this.cellValue !== 'Stock') {
      this.zoneService.getZone(this.cellValue).subscribe(zone => {
        this.zone = zone.data.nom;

      })
    }
    return true;
  }

}
