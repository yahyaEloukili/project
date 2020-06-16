import { Injectable } from '@angular/core';
import { Materiel } from "../models/materiel";
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
export class MaterielService {
  materiels: Materiel[];
  constructor(private http: HttpClient, private prod: prod) { }
  getMateriels(): Observable<{ success: boolean; data: Materiel[] }> {
    return this.http.get<{ success: boolean; data: Materiel[] }>(
      ` ${this.prod.link}/piece_rechanges`
    );
  }
  addMateriel(materiel: any): Observable<{ success: boolean; data: Materiel }> {
    return this.http.post<{ success: boolean; data: Materiel }>(
      ` ${this.prod.link}/piece_rechanges`,
      materiel
    );
  }
  getMateriel(id: string): Observable<{ success: boolean; data: Materiel }> {
    return this.http.get<{ success: boolean; data: Materiel }>(
      ` ${this.prod.link}/piece_rechanges/` + id
    );
  }
  getMaterielWithSomeFields(id?: any): Observable<{
    success: boolean;
    data: Materiel[];
  }> {

    return this.http.get<{ success: boolean; data: Materiel[] }>(
      `${this.prod.link}/piece_rechanges?select=nom,code,etat,status,reference,marque`
    );

  }

  editMateriel(
    id: string,
    materiel
  ): Observable<{ success: boolean; data: Materiel }> {
    return this.http.put<{ success: boolean; data: Materiel }>(
      `${this.prod.link}/piece_rechanges/` + id,
      materiel
    );
  }
  editMateriel2(
    id: string,
    materiel
  ): Observable<{ success: boolean; data: Materiel }> {
    return this.http.put<{ success: boolean; data: Materiel }>(
      `${this.prod.link}/piece_rechanges/` + id + `/update`,
      materiel
    );
  }
  deleteMateriel(id: string): Observable<{ success: boolean; data: {} }> {
    return this.http.delete<{ success: boolean; data: {} }>(
      ` ${this.prod.link}/piece_rechanges/` + id
    );
  }
  getMaterielOfetat(etat: any): Observable<{ success: boolean; data: Materiel[] }> {
    return this.http.get<{ success: boolean; data: Materiel[] }>(
      ` ${this.prod.link}/piece_rechanges?etat=${etat}`
    );
  }
  getMaterielOfstatut(statut: any): Observable<{ success: boolean; data: Materiel[] }> {
    return this.http.get<{ success: boolean; data: Materiel[] }>(
      ` ${this.prod.link}/piece_rechanges?status=${statut}`
    );
  }
}
