import { Component, OnInit, ViewChild } from "@angular/core";
import { Categorie } from "../../models/categorie";
import { CategorieService } from "../../services/categorie.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { FlashMessage } from "angular2-flash-messages/module/flash-message";
import { FlxUiDataTable } from 'flx-ui-datatable';
import { AgGridAngular } from 'ag-grid-angular';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ExcelService } from '../../services/excel.service';
import { UserOptions } from 'jspdf-autotable';

import { ButtonsCell3omponent } from '../buttons-cell3/buttons-cell3.component';
import { AvgCategorieComponent } from '../avg-categorie/avg-categorie.component';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: "app-categorie",
  templateUrl: "./categorie.component.html",
  styleUrls: ["./categorie.component.css"]
})
export class CategorieComponent implements OnInit {
  categories: Categorie[];
  vars: any[][];
  profile: any;
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;
  frameworkComponents;
  columnDefs;
  gridApi
  gridColumnApi;
  value;

  constructor(
    private categorieService: CategorieService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    public dataService: FlxUiDataTable,
    private excelService: ExcelService,
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
    this.categorieService.getCategorieWithSomeFields().subscribe(categorie => {


      this.vars = categorie.data.map(el => Object.values((el)));


    });
    this.columnDefs = [
      { headerName: 'nom', field: "name", sortable: true, filter: true, checkboxSelection: true, width: "380" },
      { headerName: 'Actions', field: "id", sortable: true, filter: true, cellRenderer: "id", width: "120" }


    ];
    this.frameworkComponents = {
      id: ButtonsCell3omponent,

    }
  }
  exportAsXLSX() {
    this.categorieService.getCategorieWithSomeFields().subscribe(categories => {
      this.excelService.exportAsExcelFile(categories.data, 'categories');
    })
  }
  onBtnExport(): void {

    const params = {
      columnGroups: true,
      columnKeys: ['name', 'delay'],
      fileName: 'Categories',
      columnSeparator: ','
    };
    console.log('excel');
    this.gridApi.exportDataAsCsv(params);
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.categorieService.getCategories().subscribe(categories => {
      params.api.setRowData(categories.data);


    })
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
  }
  downloadAsPDF() {
    const doc = new jsPDF('portrait', 'px', 'a4');

    doc.autoTable({
      head: [['Nom', 'Duree moyenne']],
      body: this.vars
    });
    doc.save("table.pdf");
  }

  onDeleteClick() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const delayData = selectedData.map(node => node.id);

    if (selectedData.length !== 0) {
      if (confirm('Tu est sur de vouloir supprimer ces categories?')) {
        selectedData.forEach(element => {
          this.categorieService.deleteCategorie(element.id).subscribe(() => {
            this.categorieService.getCategories().subscribe(appareils => {
              this.agGrid.api.setRowData(appareils.data);
            })
          });

        });
        this.flashMessage.show("categorie supprimée", {
          cssClass: "alert-success",
          timeout: 3000
        });
      }
    }
    else {
      alert('Merci de choisir les categories à supprimer !');
    }


  }
  onAddButtonClick() {
    this.router.navigate([`/addCategorie`]);
  }

}
