import { Component, OnInit, ViewChild } from "@angular/core";
import { Stock } from "../../models/stock";
import { StockService } from "../../services/stock.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { FlashMessage } from "angular2-flash-messages/module/flash-message";
import { FlxUiDataTable } from 'flx-ui-datatable';
import { AgGridAngular } from 'ag-grid-angular';
import * as jsPDF from 'jspdf';
import { ExcelService } from '../../services/excel.service';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { ButtonsCell5omponent } from '../buttons-cell5/buttons-cell5.component';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: "app-Stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.css"]
})
export class StockComponent implements OnInit {
  Stocks: Stock[];
  vars: any[][];
  profile: any;
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;
  frameworkComponents;
  columnDefs;
  gridApi
  gridColumnApi;
  value;

  constructor(
    private StockService: StockService,
    private flashMessage: FlashMessagesService,
    private excelService: ExcelService,
    private router: Router,
    public dataService: FlxUiDataTable,
    public authService: AuthService
  ) { }


  ngOnInit(): void {
    this.StockService.getStockWithSomeFields().subscribe(materiel => {


      this.vars = materiel.data.map(el => Object.values((el)));

    });
    this.columnDefs = [
      { headerName: 'nom', field: "nom", sortable: true, filter: true, checkboxSelection: true, width: "350" },
      { headerName: 'Actions', field: "id", sortable: true, filter: true, cellRenderer: "id", width: "100" }


    ];
    this.frameworkComponents = {
      id: ButtonsCell5omponent
    }
  }
  onLogoutClick() {
    this.authService.logout();
    // this.authService.setAuth(false);
    // this.authorized = this.authService.auth;

    this.router.navigate(["/login"]);
    return false;
  }
  downloadAsPDF() {
    const doc = new jsPDF('portrait', 'px', 'a4');

    doc.autoTable({
      head: [['nom']],
      body: this.vars
    });
    doc.save("stocks.pdf");
  }
  onBtnExport(): void {

    const params = {
      columnGroups: true,
      columnKeys: ['nom'],
      fileName: 'Stocks',
      columnSeparator: ','
    };
    console.log('excel');
    this.gridApi.exportDataAsCsv(params);
  }
  exportAsXLSX() {
    this.StockService.getStockWithSomeFields().subscribe(stocks => {
      this.excelService.exportAsExcelFile(stocks.data, 'stocks');
    })
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.StockService.getStocks().subscribe(Stocks => {
      params.api.setRowData(Stocks.data);
      this.gridApi.sizeColumnsToFit();
      window.onresize = () => {
        this.gridApi.sizeColumnsToFit();
      }



    })

  }

  onDeleteClicked() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const delayData = selectedData.map(node => node.id);

    if (selectedData.length !== 0) {
      if (confirm('Tu est sur de vouloir supprimer ces stocks?')) {
        selectedData.forEach(element => {
          this.StockService.deleteStock(element.id).subscribe(() => {
            this.StockService.getStocks().subscribe(appareils => {
              this.agGrid.api.setRowData(appareils.data);
            })
          });

        });
        this.flashMessage.show("Stock supprimé", {
          cssClass: "alert-success",
          timeout: 3000
        });
      }
    }
    else {
      alert('Merci de choisir les stocks à supprimer !');
    }


  }
  onAddButtonClick() {
    this.router.navigate([`/addStock`]);
  }

}
