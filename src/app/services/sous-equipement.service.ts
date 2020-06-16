import { Injectable } from "@angular/core";
import { Sous_equipement } from "../models/sous_equipements";
import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { of } from "rxjs";
import "rxjs/add/operator/catch";
import { error } from "protractor";
import { prod } from "../prod/prod";
@Injectable({
  providedIn: "root"
})
export class SousEquipementsService {
  constructor(private http: HttpClient, private prod: prod) { }
  getSousEquipements(id?: any): Observable<{
    success: boolean;
    data: Sous_equipement[];
  }> {
    if (!id) {
      return this.http.get<{ success: boolean; data: Sous_equipement[] }>(
        `${this.prod.link}/sous_equipements?sort=createdAt`
      );
    } else {
      return this.http.get<{ success: boolean; data: Sous_equipement[] }>(
        `${this.prod.link}/appareils/` + id + "/sous_equipements"
      );
    }
  }
  getAccessoireWithSomeFields(id?: any): Observable<{
    success: boolean;
    data: Sous_equipement[];
  }> {

    return this.http.get<{ success: boolean; data: Sous_equipement[] }>(
      `${this.prod.link}/sous_equipements?select=nom,code,etat,status,reference,marque`
    );

  }

  addSousEquipements(
    sous_equipements: any
  ): Observable<{ success: boolean; data: Sous_equipement }> {
    return this.http.post<{ success: boolean; data: Sous_equipement }>(
      `${this.prod.link}/sous_equipements`,
      sous_equipements
    );
  }
  getSousEquipement(
    id: string
  ): Observable<{ success: boolean; data: Sous_equipement }> {
    return this.http.get<{ success: boolean; data: Sous_equipement }>(
      `${this.prod.link}/sous_equipements/` + id
    );
  }

  editSousEquipement(
    id: string,
    sous_equipements
  ): Observable<{ success: boolean; data: Sous_equipement }> {
    return this.http.put<{ success: boolean; data: Sous_equipement }>(
      `${this.prod.link}/sous_equipements/` + id,
      sous_equipements
    );
  }

  editSousEquipement2(
    id: string,
    sous_equipements
  ): Observable<{ success: boolean; data: Sous_equipement }> {
    return this.http.put<{ success: boolean; data: Sous_equipement }>(
      `${this.prod.link}/sous_equipements/` + id + `/update`,
      sous_equipements
    );
  }
  deleteSousEquipement(id: string): Observable<{ success: boolean; data: {} }> {
    return this.http.delete<{ success: boolean; data: {} }>(
      `${this.prod.link}/sous_equipements/` + id
    );
  }
  getAccessoiresOfappareil(id: any): Observable<{ success: boolean; data: Sous_equipement[] }> {
    return this.http.get<{ success: boolean; data: Sous_equipement[] }>(
      ` ${this.prod.link}/sous_equipements?appareilId=${id}`
    );
  }
  getAccessoireOfetat(etat: any): Observable<{ success: boolean; data: Sous_equipement[] }> {
    return this.http.get<{ success: boolean; data: Sous_equipement[] }>(
      ` ${this.prod.link}/sous_equipements?etat=${etat}`
    );
  }
  getAccessoireOfstatut(statut: any): Observable<{ success: boolean; data: Sous_equipement[] }> {
    return this.http.get<{ success: boolean; data: Sous_equipement[] }>(
      ` ${this.prod.link}/sous_equipements?status=${statut}`
    );
  }
}
