import { Component, OnInit, EventEmitter, Output, ViewChild } from "@angular/core";
import { AppareilService } from "../../services/appareil.service";
import { SousEquipementsService } from "../../services/sous-equipement.service";
import { AuthService } from "../../services/auth.service";
import { Sous_equipement } from "../../models/sous_equipements";

import { Observable } from "rxjs";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ExcelService } from '../../services/excel.service';
import { FlxUiDataTable } from "flx-ui-datatable";
import { CustomizedCellComponent } from '../customized-cell/customized-cell.component';
import { ButtonsCellComponent } from '../buttons-cell/buttons-cell.component';
import { Appareil } from 'src/app/models/appareils';
import { AgGridAngular } from 'ag-grid-angular';
import { ButtonsCell2Component } from '../buttons-cell2/buttons-cell2.component';
import { CustomizedCell2Component } from '../customized-cell2/customized-cell2.component';
import { AnomalieAppareilCellComponent } from '../anomalie-appareil-cell/anomalie-appareil-cell.component';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { AppareilSouEquipementComponent } from '../appareil-sou-equipement/appareil-sou-equipement.component';
@Component({
  selector: "app-sous-equipements",
  templateUrl: "./sous-equipements.component.html",
  styleUrls: ["./sous-equipements.component.css"]
})
export class SousEquipementsComponent implements OnInit {

  sous_equipements: Sous_equipement[];
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;
  columnDefs;
  frameworkComponents: any;
  appareils: any[];
  gridApi: any;
  gridColumnApi: any;
  value: any;
  vars: any[][];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appareilService: AppareilService,
    private sousEquipementsService: SousEquipementsService,
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
  ngOnInit(): void {
    this.sousEquipementsService.getAccessoireWithSomeFields().subscribe(accessoires => {


      this.vars = accessoires.data.map(el => Object.values((el)));

    });
    this.columnDefs = [
      { headerName: 'Nom', field: "nom", sortable: true, filter: true, checkboxSelection: true, width: "255" },

      { headerName: 'code', field: "code", sortable: true, filter: true, width: "150" },
      { headerName: 'etat', field: "etat", sortable: true, filter: true, width: "140", cellRenderer: "etat" },
      { headerName: 'Appareil parrent', field: "appareilId", sortable: true, filter: true, width: "255", cellRenderer: "appareil2" },
      { headerName: 'statut', field: "status", sortable: true, filter: true, width: "150", cellRenderer: "statut" },
      { headerName: 'Actions', field: "id", sortable: true, filter: true, cellRenderer: "id", width: "120" },

    ];
    this.frameworkComponents = {
      statut: CustomizedCellComponent,
      etat: CustomizedCell2Component,
      id: ButtonsCell2Component,
      appareil2: AppareilSouEquipementComponent,
      appareil: AnomalieAppareilCellComponent

    }

    this.appareilService.getAppareils().subscribe(appareilData => {
      this.appareils = [""];
      appareilData.data.forEach(element => {
        element.nom = element.nom + '-' + element.code;
        this.appareils.push({ id: element.id.toString(), text: element.nom });
      })
    });
  }
  onBtnExport(): void {

    const params = {
      columnGroups: true,
      columnKeys: ['nom', 'status', 'code', 'etat'],
      fileName: 'accessoires',
      columnSeparator: ','
    };
    console.log('excel');
    this.gridApi.exportDataAsCsv(params);
  }
  setAppareil(ev) {

    this.sousEquipementsService.getAccessoiresOfappareil(ev).subscribe(appreils => {
      this.agGrid.api.setRowData(appreils.data);

    })
  }
  exportAsXLSX() {
    this.sousEquipementsService.getAccessoireWithSomeFields().subscribe(accessoires => {
      this.excelService.exportAsExcelFile(accessoires.data, 'accessoires');
    })
  }

  downloadAsPDF() {
    const doc = new jsPDF('portrait', 'px', 'a4');

    doc.autoTable({
      head: [['nom', 'code', 'etat', 'status', 'reference', 'marque', 'nombre']],
      body: this.vars
    });
    doc.save("accessoires.pdf");
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.sousEquipementsService.getSousEquipements().subscribe(sous_equipements => {
      params.api.setRowData(sous_equipements.data);
      this.gridApi.sizeColumnsToFit();
      window.onresize = () => {
        this.gridApi.sizeColumnsToFit();
      }


    })

  }

  setValue(ev) {
    this.value = ev;

    if (ev === 'tout') {
      this.sousEquipementsService.getSousEquipements().subscribe(accessoire => {
        this.agGrid.api.setRowData(accessoire.data);
      })
    }
  }

  onAddButtonClick(ev) {
    this.router.navigate([`/addAccessoire`]);
  }

  onDeleteClick(ev) {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const delayData = selectedData.map(node => node.id);

    if (selectedData.length !== 0) {
      if (confirm('Tu est sur de vouloir supprimer ces accessoires?')) {
        selectedData.forEach(element => {
          this.sousEquipementsService.deleteSousEquipement(element.id).subscribe(() => {
            this.sousEquipementsService.getSousEquipements().subscribe(accessoires => {
              this.agGrid.api.setRowData(accessoires.data);
            })
          });

        });
        this.flashMessage.show("Accessoire supprimé", {
          cssClass: "alert-success",
          timeout: 3000
        });
      }
      this.setValue('tout');
    }
    else {
      alert('Merci de choisir les accessoires à supprimer !');
    }


  }
  setEtat(ev) {
    this.sousEquipementsService.getAccessoireOfetat(ev).subscribe(appreils => {
      this.agGrid.api.setRowData(appreils.data);
    })
  }
  setStatut(ev) {
    this.sousEquipementsService.getAccessoireOfstatut(ev).subscribe(appreils => {
      this.agGrid.api.setRowData(appreils.data);
    })
  }

}
