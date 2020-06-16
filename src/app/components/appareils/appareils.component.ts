import { Component, OnInit, EventEmitter, Output, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { AppareilService } from "../../services/appareil.service";
import { CategorieService } from "../../services/categorie.service";
import { StockService } from "../../services/stock.service";
import { AuthService } from "../../services/auth.service";
import { Appareil } from "../../models/appareils";
import { Stock } from "../../models/stock";
import { Categorie } from "../../models/categorie";

import { Observable } from "rxjs";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlxUiDataTable } from "flx-ui-datatable";
import { AgGridAngular } from 'ag-grid-angular'
import { NgClass } from '@angular/common';
import { CustomizedCellComponent } from '../customized-cell/customized-cell.component';
import { CustomizedCell2Component } from '../customized-cell2/customized-cell2.component';
import { ButtonsCellComponent } from '../buttons-cell/buttons-cell.component';
import { ExcelService } from '../../services/excel.service';
import { CustomizedCell3Component } from '../customized-cell3/customized-cell3.component';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { GridOptions, IDatasource, IGetRowsParams } from 'ag-grid-community';



@Component({
  selector: "app-appareils",
  templateUrl: "./appareils.component.html",
  styleUrls: ["./appareils.component.css"]
})

export class AppareilsComponent implements OnInit {
  appareils: Appareil[];
  @Output() agGrid2: EventEmitter<any> = new EventEmitter();
  @ViewChild('pdfTable') pdfTable: { nativeElement: any; };
  profile: any;
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;
  frameworkComponents: any;
  columnDefs: any;
  gridApi: any;
  gridColumnApi: any;
  stocks: Stock[];
  categories: any[];
  value;
  params;
  paginationPageSize;
  rowData;
  vars: any[][];
  public gridOptions: Partial<GridOptions>;

  // select the source to filter with
  setValue(ev) {
    this.value = ev;
    if (ev === 'tout') {
      this.appareilService.getAppareils().subscribe(appreils => {
        this.agGrid.api.setRowData(appreils.data);
      })
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appareilService: AppareilService,
    private stockService: StockService,
    private flashMessage: FlashMessagesService,
    public authService: AuthService,
    private excelService: ExcelService,
    private categorieService: CategorieService
  ) { }

  ngOnInit(): void {
    // set the columns to show in the pdf file
    this.appareilService.getAppareilsWithSomeFields().subscribe(appareils => {

      this.vars = appareils.data.map(el => Object.values((el)));


    });
    this.categorieService.getCategories().subscribe(categorieData => {
      this.categories = categorieData.data;
      // console.log(categorieData);
      // categorieData.data.forEach(element => {
      //   console.log(element.name);
      //   this.categories.push({ id: element.id.toString(), text: element.name });
      // })
    });
    // Set number of rows of a page
    this.paginationPageSize = 30;

    //  Set the columns of the grid
    this.columnDefs = [
      { headerName: 'Nom', field: "nom", sortable: true, filter: true, checkboxSelection: true, width: 250, },
      { headerName: 'Code', field: "code", sortable: true, filter: true, width: 125 },
      { headerName: 'Statut', field: "status", sortable: true, filter: true, width: 120, cellRenderer: "statut" },
      { headerName: 'Reference', field: "reference", sortable: true, filter: true, width: 125 },
      { headerName: 'Etat', field: "etat", sortable: true, filter: true, width: 120, cellRenderer: "etat" },
      { headerName: 'Actions', field: "id", cellRenderer: "id", width: 100 },
    ];

    //  Customize some columns with other components
    this.frameworkComponents = {
      statut: CustomizedCellComponent,
      etat: CustomizedCell2Component,
      id: ButtonsCellComponent,
      categorie: CustomizedCell3Component
    }

    // set the filter drop downlist of stocks
    this.stockService.getStocks().subscribe(stocks => {

      this.stocks = stocks.data;
    })
    // set the filter drop downlist of categories
    // this.categorieService.getCategories().subscribe(categories => {
    //   this.categories = categories.data;
    // })
  }
  setStock(ev) {

    this.appareilService.getAppareilsOfStock(ev).subscribe(appreils => {
      this.agGrid.api.setRowData(appreils.data);
    })
  }
  setcategorie(ev) {

    this.appareilService.getAppareilsOfcategorie(ev).subscribe(appreils => {
      this.agGrid.api.setRowData(appreils.data);
    })
  }
  setEtat(ev) {
    this.appareilService.getAppareilsOfetat(ev).subscribe(appreils => {
      this.agGrid.api.setRowData(appreils.data);
    })
  }

  onBtnExport(): void {

    const params = {
      columnGroups: true,

      columnKeys: ['nom', 'code', 'status', 'reference', 'etat'],
      fileName: 'Appareils',
      columnSeparator: ','
    };

    this.gridApi.exportDataAsCsv(params);
  }

  downloadAsPDF() {

    const doc = new jsPDF('portrait', 'px', 'a4');

    doc.autoTable({
      head: [['Nom', 'Code', 'Etat', 'Status', 'Reference', 'Numero de serie']],
      body: this.vars
    });
    doc.save("appareils.pdf");
  }
  exportAsXLSX() {
    this.appareilService.getAppareilsWithSomeFields2().subscribe(appareils => {
      this.excelService.exportAsExcelFile(appareils.data, 'appareils');
    })
  }

  setStatut(ev) {
    this.appareilService.getAppareilsOfstatut(ev).subscribe(appreils => {
      this.agGrid.api.setRowData(appreils.data);
    })
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.appareilService.getAppareils().subscribe(appareils => {

      params.api.setRowData(appareils.data);
      this.gridApi = params.api;
      this.gridApi.sizeColumnsToFit();
      window.onresize = () => {
        this.gridApi.sizeColumnsToFit();
      }

    })


  }


  onAddButtonClick() {
    this.router.navigate([`/addAppareil`]);
  }

  deleteData() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const delayData = selectedData.map(node => node.id);

    if (selectedData.length !== 0) {
      if (confirm('Tu est sur de vouloir supprimer ces appareils?')) {
        selectedData.forEach(element => {
          this.appareilService.deleteAppareil(element.id).subscribe(() => {
            this.appareilService.getAppareils().subscribe(appareils => {
              this.agGrid.api.setRowData(appareils.data);
            })
          });

        });

      }
    }
    else {
      alert('Merci de choisir les appareils à supprimer !');
    }


  }

}
