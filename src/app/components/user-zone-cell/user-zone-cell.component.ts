import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ZoneService } from "../../services/zone.service";

@Component({
  selector: 'app-user-zone-cell',
  templateUrl: './user-zone-cell.component.html',
  styleUrls: ['./user-zone-cell.component.css']
})
export class UserZoneCellComponent implements OnInit {

  cellValue;
  zone: any;

  constructor(private zoneService: ZoneService) { }

  ngOnInit(): void {

  }
  agInit(params: any) {

    this.cellValue = params.value;
    if (this.cellValue) {
      this.zoneService.getZone(this.cellValue).subscribe(zone => {
        this.zone = zone.data.nom;

      })
    }

  }
  refresh(params: any): boolean {
    this.cellValue = params.value;
    this.zoneService.getZone(this.cellValue).subscribe(zone => {
      this.zone = zone.data.nom;

    })

    return true;
  }


}
