import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { FlashMessage } from "angular2-flash-messages/module/flash-message";
import { FlxUiDataTable } from 'flx-ui-datatable';
import { AgGridAngular } from 'ag-grid-angular';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { ButtonsCell6Component } from '../buttons-cell6/buttons-cell6.component';
import { UserRoleCellComponent } from '../user-role-cell/user-role-cell.component';
import { UserZoneCellComponent } from '../user-zone-cell/user-zone-cell.component';
import { AuthService } from 'src/app/services/auth.service';
import { ExcelService } from 'src/app/services/excel.service';
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  Users: User[];
  vars: any[][];
  profile: any;
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;
  frameworkComponents;
  columnDefs;
  gridApi
  gridColumnApi;
  value;

  constructor(
    private userService: UserService,
    private flashMessage: FlashMessagesService,
    private excelService: ExcelService,
    private router: Router,
    public dataService: FlxUiDataTable,
    public authService: AuthService
  ) { }

  onBtnExport(): void {

    const params = {
      columnGroups: true,
      columnKeys: ['nom', 'email', 'role'],
      fileName: 'Utilisateurs',
      columnSeparator: ','
    };
    console.log('excel');
    this.gridApi.exportDataAsCsv(params);
  }
  exportAsXLSX() {
    this.userService.getUserWithSomeFields().subscribe(users => {
      this.excelService.exportAsExcelFile(users.data, 'users');
    })
  }
  ngOnInit(): void {
    this.userService.getUserWithSomeFields().subscribe(user => {


      this.vars = user.data.map(el => Object.values((el)));

    });
    this.columnDefs = [
      { headerName: 'nom', field: "nom", sortable: true, filter: true, checkboxSelection: true, width: "180" },
      // { headerName: 'matricule', field: "matricule", sortable: true, filter: true, width: "330" },
      { headerName: 'email', field: "email", sortable: true, filter: true },
      { headerName: 'role', field: "role", sortable: true, filter: true, cellRenderer: 'role' },
      { headerName: 'Zone', field: "zone_nom", sortable: true, filter: true },
      { headerName: 'Actions', field: "id", sortable: true, filter: true, cellRenderer: "id", width: "90" },


    ];
    this.frameworkComponents = {
      id: ButtonsCell6Component,
      role: UserRoleCellComponent,
      zone: UserZoneCellComponent

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

      head: [['nom', 'email', 'role']],
      body: this.vars
    });

    doc.save("utilisateurs.pdf");
  }
  onGridReady(params) {

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.userService.getUsers().subscribe(Users => {
      params.api.setRowData(Users.data);

      this.gridApi.sizeColumnsToFit();
      window.onresize = () => {
        this.gridApi.sizeColumnsToFit();
      }
    })

  }

  showData() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const delayData = selectedData.map(node => node.id);

    if (selectedData.length !== 0) {
      if (confirm('Tu est sur de vouloir supprimer ces utilisateurs?')) {
        selectedData.forEach(element => {
          this.userService.deleteUser(element.id).subscribe(() => {
            this.userService.getUsers().subscribe(appareils => {
              this.agGrid.api.setRowData(appareils.data);
            })
          });

        });
        this.flashMessage.show("Utilisateur supprimée", {
          cssClass: "alert-success",
          timeout: 3000
        });
      }
    }
    else {
      alert('Merci de choisir les utilisateurs à supprimer !');
    }


  }
  onAddButtonClick() {
    this.router.navigate([`/addUser`]);
  }

}
