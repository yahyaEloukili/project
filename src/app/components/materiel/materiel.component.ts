import { Component, OnInit, EventEmitter, Output, ViewChild } from "@angular/core";
import { AppareilService } from "../../services/appareil.service";
import { MaterielService } from "../../services/materiel.service";
import { AuthService } from "../../services/auth.service";
import { Materiel } from "../../models/materiel";

import { Observable } from "rxjs";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { FlxUiDataTable } from "flx-ui-datatable";
import { ExcelService } from '../../services/excel.service';
import { CustomizedCellComponent } from '../customized-cell/customized-cell.component';
import { MaterielEtatCellComponent } from '../materiel-etat-cell/materiel-etat-cell.component';
import { ButtonsCellComponent } from '../buttons-cell/buttons-cell.component';

import { AgGridAngular } from 'ag-grid-angular';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { ButtonsCell7Component } from '../buttons-cell7/buttons-cell7.component';
@Component({
  selector: "app-materiel",
  templateUrl: "./materiel.component.html",
  styleUrls: ["./materiel.component.css"]
})
export class MaterielComponent implements OnInit {

  Materiels: Materiel[];
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;
  columnDefs;
  frameworkComponents: any;
  gridApi: any;
  gridColumnApi: any;
  value: any;
  vars: any[][];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appareilService: AppareilService,
    private materielService: MaterielService,
    private flashMessage: FlashMessagesService,
    private excelService: ExcelService,
    public authService: AuthService,
    public dataService: FlxUiDataTable
  ) { }
  onLogoutClick() {
    this.authService.logout();
    // this.authService.setAuth(false);
    // this.authorized = this.authService.auth;

    this.router.navigate(["/login"]);
    return false;
  }
  onBtnExport(): void {

    const params = {
      columnGroups: true,
      columnKeys: ['nom', 'status', 'code', 'etat', 'marque', 'reference'],
      fileName: 'materiels',
      columnSeparator: ','
    };
    console.log('excel');
    this.gridApi.exportDataAsCsv(params);
  }
  ngOnInit(): void {
    this.materielService.getMaterielWithSomeFields().subscribe(materiel => {


      this.vars = materiel.data.map(el => Object.values((el)));

    });
    this.columnDefs = [
      { headerName: 'nom', field: "nom", sortable: true, filter: true, checkboxSelection: true, width: "290" },
      { headerName: 'code', field: "code", sortable: true, filter: true, width: "130" },
      { headerName: 'marque', field: "marque", sortable: true, filter: true, width: "100" },
      { headerName: 'statut', field: "status", sortable: true, filter: true, cellRenderer: "statut", width: "120" },
      { headerName: 'reference', field: "reference", sortable: true, filter: true, width: "120" },

      { headerName: 'etat', field: "etat", sortable: true, filter: true, cellRenderer: "etat", width: "130" },
      { headerName: 'Actions', field: "id", sortable: true, filter: true, cellRenderer: "id", width: "110" },

    ];
    this.frameworkComponents = {
      statut: CustomizedCellComponent,
      id: ButtonsCell7Component,
      etat: MaterielEtatCellComponent
    }


  }
  downloadAsPDF() {
    const doc = new jsPDF('portrait', 'px', 'a4');

    doc.autoTable({
      head: [['nom', 'code', 'etat', 'status', 'reference', 'marque', 'nombre']],
      body: this.vars
    });
    doc.save("materiels.pdf");
  }
  setValue(ev) {
    this.value = ev;
    console.log(ev);
    if (ev === 'tout') {
      this.materielService.getMateriels().subscribe(materiels => {
        this.agGrid.api.setRowData(materiels.data);
      })
    }
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.materielService.getMateriels().subscribe(Materiels => {
      params.api.setRowData(Materiels.data);
      this.gridApi = params.api;
      this.gridApi.sizeColumnsToFit();
      window.onresize = () => {
        this.gridApi.sizeColumnsToFit();
      }

    })

  }



  onAddButtonClick() {
    this.router.navigate([`/addMateriel`]);
  }
  exportAsXLSX() {
    this.materielService.getMaterielWithSomeFields().subscribe(materiel => {
      this.excelService.exportAsExcelFile(materiel.data, 'materiel');
    })
  }

  onDeleteClick(ev) {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const delayData = selectedData.map(node => node.id);

    if (selectedData.length !== 0) {
      if (confirm('Tu est sur de vouloir supprimer ces materiel?')) {
        selectedData.forEach(element => {
          this.materielService.deleteMateriel(element.id).subscribe(() => {
            this.materielService.getMateriels().subscribe(materiel => {
              this.agGrid.api.setRowData(materiel.data);
            })
          });

        });

      }
      this.setValue('tout');
    }
    else {
      alert('Merci de choisir les materiels à supprimer !');
    }


  }
  setEtat(ev) {
    this.materielService.getMaterielOfetat(ev).subscribe(materiel => {
      this.agGrid.api.setRowData(materiel.data);
    })
  }
  setStatut(ev) {
    this.materielService.getMaterielOfstatut(ev).subscribe(materiel => {
      this.agGrid.api.setRowData(materiel.data);
    })
  }

}
