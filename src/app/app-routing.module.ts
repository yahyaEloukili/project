import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppareilsComponent } from "./components/appareils/appareils.component";
import { MaterielComponent } from "./components/materiel/materiel.component";
import { AppareilDetailsComponent } from "./components/appareil-details/appareil-details.component";
import { AddAppareilComponent } from "./components/add-appareil/add-appareil.component";
import { SousEquipementsComponent } from "./components/sous-equipements/sous-equipements.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { RegisterComponent } from "./components/register/register.component";
import { CategorieComponent } from "./components/categorie/categorie.component";
import { ZoneComponent } from "./components/zone/zone.component";
import { StockComponent } from "./components/stocks/stock.component";
import { UsersComponent } from "./components/users/users.component";
import { BarchartComponent } from "./components/barchart/barchart.component";
import { AddZoneComponent } from "./components/add-zone/add-zone.component";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { AddCategorieComponent } from "./components/add-categorie/add-categorie.component";
import { AddStockComponent } from "./components/add-stock/add-stock.component";
import { EditCategorieComponent } from "./components/edit-categorie/edit-categorie.component";
import { EditUserComponent } from "./components/edit-user/edit-user.component";
import { EditSousEquipementComponent } from "./components/edit-sous-equipement/edit-sous-equipement.component";
import { ReceivePasswordComponent } from "./components/receive-password/receive-password.component";
import { MouvementsComponent } from "./components/mouvements/mouvements.component";
import { MouvementDetailComponent } from "./components/mouvement-detail/mouvement-detail.component";
import { AnomalieDetailComponent } from "./components/anomalie-detail/anomalie-detail.component";

import { LoginComponent } from "./components/login/login.component";
import { Login2Component } from "./components/login2/login2.component";
import { AuthGuard } from "./guards/auth.guard";
import { AddSousEquipementComponent } from "./components/add-sous-equipement/add-sous-equipement.component";
import { AccessoiresDetailComponent } from "./components/accessoires-detail/accessoires-detail.component";
import { RecetPasswordComponent } from "./components/recet-password/recet-password.component";
import { ResetPassword2Component } from "./components/reset-password2/reset-password2.component";
import { EditZoneComponent } from "./components/edit-zone/edit-zone.component";
import { EditStockComponent } from "./components/edit-stock/edit-stock.component";
import { AppareilDetailComponent } from "./components/appareil-detail/appareil-detail.component";
import { AddMaterielComponent } from "./components/add-materiel/add-materiel.component";
import { SousEquipementsOfAppareilComponent } from "./components/sous-equipements-of-appareil/sous-equipements-of-appareil.component";
import { EditMaterielComponent } from "./components/edit-materiel/edit-materiel.component";
import { MaterielDetailComponent } from "./components/materiel-detail/materiel-detail.component";
import { DepotsComponent } from "./components/depots/depots.component";
import { AnomaliesComponent } from "./components/anomalies/anomalies.component";
// import { TestComponent } from "./components/test/test.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SousEquipementsService } from './services/sous-equipement.service';
import { MouvementsService } from './services/mouvements.service';

const routes: Routes = [
  // {
  //   path: "test",
  //   component: TestComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: "appareils",
    component: AppareilsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "mouvements",
    component: MouvementsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "depots",
    component: DepotsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "anomalies",
    component: AnomaliesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "materiel",
    component: MaterielComponent,
    canActivate: [AuthGuard]
  },

  { path: "zones", component: ZoneComponent, canActivate: [AuthGuard] },
  { path: "stocks", component: StockComponent, canActivate: [AuthGuard] },
  { path: "users", component: UsersComponent, canActivate: [AuthGuard] },
  { path: "addZone", component: AddZoneComponent, canActivate: [AuthGuard] },
  { path: "addUser", component: AddUserComponent, canActivate: [AuthGuard] },
  {
    path: "appareil/:id",
    component: AppareilDetailsComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "editMateriel/:id",
    component: EditMaterielComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "appareilDetail/:id",
    component: AppareilDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "accessoireDetail/:id",
    component: AccessoiresDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "mouvementDetail/:id",
    component: MouvementDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "anomalieDetail/:id",
    component: AnomalieDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "accessoires/:id",
    component: SousEquipementsOfAppareilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "materiel/:id",
    component: MaterielDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "editAccessoire/:id",
    component: EditSousEquipementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "users/:id",
    component: EditUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addAppareil",
    component: AddAppareilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addMateriel",
    component: AddMaterielComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addStock",
    component: AddStockComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "editCategorie/:id",
    component: EditCategorieComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "editZone/:id",
    component: EditZoneComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "editStock/:id",
    component: EditStockComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: Login2Component
  },
  {
    path: "categories",
    component: CategorieComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addCategorie",
    component: AddCategorieComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addAccessoire",
    component: AddSousEquipementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "accessoires",
    component: SousEquipementsComponent,
    canActivate: [AuthGuard]
  },
  { path: "register", component: RegisterComponent },


  { path: "resetPassword", component: RecetPasswordComponent },
  { path: "resetPassword2", component: ResetPassword2Component },
  {
    path: "",
    component: BarchartComponent,
    canActivate: [AuthGuard]
  },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
