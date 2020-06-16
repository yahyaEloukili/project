import { Component, OnInit, ViewChild } from "@angular/core";
import { Zone } from "../../models/zone";
import { ZoneService } from "../../services/zone.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { FlashMessage } from "angular2-flash-messages/module/flash-message";
import { FlxUiDataTable } from 'flx-ui-datatable';

import { AgGridAngular } from 'ag-grid-angular';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { ButtonsCell4omponent } from '../buttons-cell4/buttons-cell4.component';
import { AuthService } from 'src/app/services/auth.service';
import { ExcelService } from 'src/app/services/excel.service';
@Component({
  selector: "app-Zone",
  templateUrl: "./zone.component.html",
  styleUrls: ["./zone.component.css"]
})
export class ZoneComponent implements OnInit {
  Zones: Zone[];
  vars: any[][];
  profile: any;
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;
  frameworkComponents;
  columnDefs;
  gridApi
  gridColumnApi;
  value;

  constructor(
    private zoneService: ZoneService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private excelService: ExcelService,
    public dataService: FlxUiDataTable,
    public authService: AuthService
  ) { }
  onLogoutClick() {
    this.authService.logout();
    // this.authService.setAuth(false);
    // this.authorized = this.authService.auth;

    this.router.navigate(["/login"]);
    return false;
  }

  ngOnInit(): void {
    this.zoneService.getZoneWithSomeFields().subscribe(materiel => {


      this.vars = materiel.data.map(el => Object.values((el)));

    });
    this.columnDefs = [
      { headerName: 'nom', field: "nom", sortable: true, filter: true, checkboxSelection: true, width: "350" },
      { headerName: 'Actions', field: "id", sortable: true, filter: true, cellRenderer: "id", width: "100" }


    ];
    this.frameworkComponents = {
      id: ButtonsCell4omponent
    }
  }
  onBtnExport(): void {

    const params = {
      columnGroups: true,
      columnKeys: ['nom'],
      fileName: 'Zones',
      columnSeparator: ','
    };
    console.log('excel');
    this.gridApi.exportDataAsCsv(params);
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.zoneService.getZones().subscribe(zones => {
      params.api.setRowData(zones.data);


    })
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }

  }
  downloadAsPDF() {
    const doc = new jsPDF('portrait', 'px', 'a4');

    doc.autoTable({
      head: [['nom']],
      body: this.vars
    });
    doc.save("zones.pdf");
  }
  exportAsXLSX() {
    this.zoneService.getZoneWithSomeFields().subscribe(zones => {
      this.excelService.exportAsExcelFile(zones.data, 'zones');
    })
  }
  onDeleteClicked() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const delayData = selectedData.map(node => node.id);

    if (selectedData.length !== 0) {
      if (confirm('Tu est sur de vouloir supprimer ces zones?')) {
        selectedData.forEach(element => {
          this.zoneService.deleteZone(element.id).subscribe(() => {
            this.zoneService.getZones().subscribe(appareils => {
              this.agGrid.api.setRowData(appareils.data);
            })
          });

        });
        this.flashMessage.show("Zone supprimée", {
          cssClass: "alert-success",
          timeout: 3000
        });
      }
    }
    else {
      alert('Merci de choisir les zones à supprimer !');
    }


  }
  onAddButtonClick() {
    this.router.navigate([`/addZone`]);
  }

}
