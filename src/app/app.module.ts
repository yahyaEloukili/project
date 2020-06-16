import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
// import { Select2Module } from 'ng2-select2';
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AppareilsComponent } from "./components/appareils/appareils.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AppareilDetailsComponent } from "./components/appareil-details/appareil-details.component";
import { AddAppareilComponent } from "./components/add-appareil/add-appareil.component";
import { FlashMessagesModule } from "angular2-flash-messages";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { FlxUiDatatableModule, FlxUiDataTable } from "flx-ui-datatable";
import { SousEquipementsComponent } from "./components/sous-equipements/sous-equipements.component";
import { EditSousEquipementComponent } from "./components/edit-sous-equipement/edit-sous-equipement.component";
import { AddSousEquipementComponent } from "./components/add-sous-equipement/add-sous-equipement.component";
import { CategorieComponent } from "./components/categorie/categorie.component";
import { AddCategorieComponent } from "./components/add-categorie/add-categorie.component";
import { EditCategorieComponent } from "./components/edit-categorie/edit-categorie.component";
import { ZoneComponent } from "./components/zone/zone.component";
import { AddZoneComponent } from "./components/add-zone/add-zone.component";
import { EditZoneComponent } from "./components/edit-zone/edit-zone.component";
import { UsersComponent } from "./components/users/users.component";
import { AddUserComponent } from "./components/add-user/add-user.component";

import { FooterComponent } from "./components/footer/footer.component";
import { EditUserComponent } from "./components/edit-user/edit-user.component";
import { PiecesRechangeComponent } from "./components/pieces-rechange/pieces-rechange.component";
import { ReceivePasswordComponent } from "./components/receive-password/receive-password.component";
import { RecetPasswordComponent } from "./components/recet-password/recet-password.component";
import { StockComponent } from "./components/stocks/stock.component";
import { AddStockComponent } from "./components/add-stock/add-stock.component";
import { EditStockComponent } from "./components/edit-stock/edit-stock.component";
import { AppareilDetailComponent } from "./components/appareil-detail/appareil-detail.component";
import { RouterModule } from "@angular/router";
import { MaterielComponent } from './components/materiel/materiel.component';
import { AddMaterielComponent } from './components/add-materiel/add-materiel.component';
import { SousEquipementsOfAppareilComponent } from './components/sous-equipements-of-appareil/sous-equipements-of-appareil.component';
import { AccessoiresDetailComponent } from './components/accessoires-detail/accessoires-detail.component';
import { EditMaterielComponent } from './components/edit-materiel/edit-materiel.component';
import { MaterielDetailComponent } from './components/materiel-detail/materiel-detail.component';
import { prod } from './prod/prod';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AgGridModule } from 'ag-grid-angular';
// import { TestComponent } from './components/test/test.component'
import { ChartsModule } from "ng2-charts";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { CustomizedCellComponent } from './components/customized-cell/customized-cell.component';
import { ButtonsCellComponent } from './components/buttons-cell/buttons-cell.component';
import { ButtonsCell2Component } from './components/buttons-cell2/buttons-cell2.component';
import { ButtonsCell3omponent } from './components/buttons-cell3/buttons-cell3.component';
import { ButtonsCell4omponent } from './components/buttons-cell4/buttons-cell4.component';
import { ButtonsCell5omponent } from './components/buttons-cell5/buttons-cell5.component';
import { ButtonsCell6Component } from './components/buttons-cell6/buttons-cell6.component';
import { ButtonsCell7Component } from './components/buttons-cell7/buttons-cell7.component';
import { CustomizedCell2Component } from './components/customized-cell2/customized-cell2.component';
import { CustomizedCell3Component } from './components/customized-cell3/customized-cell3.component';
import { BarchartComponent } from './components/barchart/barchart.component';
import { MouvementsComponent } from './components/mouvements/mouvements.component';
import { AppareilMouvementCellComponent } from './components/appareil-mouvement-cell/appareil-mouvement-cell.component';
import { UserMouvementCellComponent } from './components/user-mouvement-cell/user-mouvement-cell.component';
import { ZoneMouvementCellComponent } from './components/zone-mouvement-cell/zone-mouvement-cell.component';
import { DateMouvementCellComponent } from './components/date-mouvement-cell/date-mouvement-cell.component';
import { AppareilCodeMouvementCellComponent } from './components/appareil-code-mouvement-cell/appareil-code-mouvement-cell.component';
import { MouvementDetailComponent } from './components/mouvement-detail/mouvement-detail.component';
import { DetailMouvementComponent } from './components/detail-mouvement/detail-mouvement.component';
import { UserRoleCellComponent } from './components/user-role-cell/user-role-cell.component';
import { UserZoneCellComponent } from './components/user-zone-cell/user-zone-cell.component';
import { AnomaliesComponent } from './components/anomalies/anomalies.component';
import { NgSelect2Module } from 'ng-select2';
import 'ng-select2';
import { ExcelService } from './services/excel.service';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { jsPdf } from "jspdf";
import { UserOptions } from "jspdf-autotable";
import { AnomalieDetailCellComponent } from './components/anomalie-detail-cell/anomalie-detail-cell.component';
import { AnomalieDetailComponent } from './components/anomalie-detail/anomalie-detail.component';
import { AnomalieAppareilCellComponent } from './components/anomalie-appareil-cell/anomalie-appareil-cell.component';
import { AnomalieUserCellComponent } from './components/anomalie-user-cell/anomalie-user-cell.component';
import { MaterielEtatCellComponent } from './components/materiel-etat-cell/materiel-etat-cell.component';
import { AnomalieActionsComponent } from './components/anomalie-actions/anomalie-actions.component';
import { Login2Component } from './components/login2/login2.component';
import { ResetPassword2Component } from './components/reset-password2/reset-password2.component';
import { DepotsComponent } from './components/depots/depots.component';
import { Test2Component } from './components/test2/test2.component';
import { DateAnomalieComponent } from './components/date-anomalie/date-anomalie.component';
import { AvgCategorieComponent } from './components/avg-categorie/avg-categorie.component';
import { ClotureComponent } from './components/cloture/cloture.component';
import { AppareilSouEquipementComponent } from './components/appareil-sou-equipement/appareil-sou-equipement.component';



@NgModule({
  declarations: [
    AppComponent,
    AppareilsComponent,
    NavbarComponent,
    AppareilDetailsComponent,
    AddAppareilComponent,
    RegisterComponent,
    LoginComponent,
    SousEquipementsComponent,
    EditSousEquipementComponent,
    AddSousEquipementComponent,
    CategorieComponent,
    AddCategorieComponent,
    EditCategorieComponent,
    ZoneComponent,
    AddZoneComponent,
    EditZoneComponent,
    UsersComponent,
    AddUserComponent,
    FooterComponent,
    EditUserComponent,
    PiecesRechangeComponent,
    ReceivePasswordComponent,
    RecetPasswordComponent,
    StockComponent,
    AddStockComponent,
    EditStockComponent,
    AppareilDetailComponent,
    MaterielComponent,
    AddMaterielComponent,
    SousEquipementsOfAppareilComponent,
    AccessoiresDetailComponent,
    EditMaterielComponent,
    MaterielDetailComponent,
    NotFoundComponent,
    // TestComponent,
    CustomizedCellComponent,
    ButtonsCellComponent,
    ButtonsCell2Component,
    ButtonsCell3omponent,
    ButtonsCell4omponent,
    ButtonsCell5omponent,
    ButtonsCell6Component,
    ButtonsCell7Component,
    CustomizedCell2Component,
    CustomizedCell3Component,
    BarchartComponent,
    MouvementsComponent,
    AppareilMouvementCellComponent,
    UserMouvementCellComponent,
    ZoneMouvementCellComponent,
    DateMouvementCellComponent,
    AppareilCodeMouvementCellComponent,
    MouvementDetailComponent,
    DetailMouvementComponent,
    UserRoleCellComponent,
    UserZoneCellComponent,
    AnomaliesComponent,
    AnomalieDetailCellComponent,
    AnomalieDetailComponent,
    AnomalieAppareilCellComponent,
    AnomalieUserCellComponent,
    MaterielEtatCellComponent,
    AnomalieActionsComponent,
    Login2Component,
    ResetPassword2Component,
    DepotsComponent,
    Test2Component,
    DateAnomalieComponent,
    AvgCategorieComponent,
    ClotureComponent,
    AppareilSouEquipementComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    NgSelect2Module,
    AgGridModule.withComponents([CustomizedCellComponent]),
    AppRoutingModule,
    HttpClientModule,
    FlxUiDatatableModule,
    FlashMessagesModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BsDatepickerModule.forRoot(),
    ChartsModule
  ],
  providers: [AuthGuard, FlxUiDataTable, prod, ExcelService],

  bootstrap: [AppComponent]
})
export class AppModule { }
