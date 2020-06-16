import { Injectable } from "@angular/core";
import { Appareil } from "../models/appareils";
import { HttpHeaders, HttpResponse, HttpInterceptor, HttpHandler } from "@angular/common/http";
import { CategorieService } from "./categorie.service";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { of } from "rxjs";
import "rxjs/add/operator/catch";
import { error } from "protractor";
import { prod } from "../prod/prod";
import { mergeMap } from 'rxjs-compat/operator/mergeMap';
@Injectable({
  providedIn: "root"
})
export class AppareilService {

  appareils: Appareil[];

  constructor(private http: HttpClient, private categorieService: CategorieService, private prod: prod) { }
  getAppareils2(params?) {

    return this.http.post(
      `${this.prod.link}/appareils/op`, params
    );


  }
  getAppareils(page?, search?): Observable<{ success: boolean; data: Appareil[] }> {
    return this.http.get<{ success: boolean; data: any }>(
      `${this.prod.link}/appareils?page=${page}`
    );


  }

  getAppareilsWithSomeFields(): Observable<{ success: boolean; data: Appareil[] }> {


    return this.http.get<{ success: boolean; data: Appareil[] }>(
      `${this.prod.link}/appareils?select=nom,code,etat,status,reference,numero_serie`
    );
  }
  getAppareilsWithSomeFields2(): Observable<{ success: boolean; data: Appareil[] }> {


    return this.http.get<{ success: boolean; data: Appareil[] }>(
      `${this.prod.link}/appareils?select=nom,code,etat,status,reference,numero_serie,marque,dernier_etalonnage,frequence,matricule`
    );
  }
  getAppareilsArrayLength(): Observable<{ success: boolean; data: any }> {
    return this.http.get<{ success: boolean; data: any }>(
      `${this.prod.link}/appareils/appareilArray`
    );
  }
  getAppareilsOfStockArrayLength(): Observable<{ success: boolean; data: any }> {
    return this.http.get<{ success: boolean; data: any }>(
      `${this.prod.link}/appareils/appareilArray4`
    );
  }
  getAppareilsArrayCategorieBonEtat(): Observable<{ success: boolean; data: any }> {
    return this.http.get<{ success: boolean; data: any }>(
      `${this.prod.link}/appareils/appareilArray2`
    );
  }
  getAppareilsArrayCategorieMauvaisEtat(): Observable<{ success: boolean; data: any }> {
    return this.http.get<{ success: boolean; data: any }>(
      `${this.prod.link}/appareils/appareilArray3`
    );
  }
  getAppareilsOfEtatArrayLength(): Observable<{ success: boolean; data: any }> {
    return this.http.get<{ success: boolean; data: any }>(
      `${this.prod.link}/appareils/appareilArrayOfEtat`
    );
  }
  getAppareilsOfStatutArrayLength(): Observable<{ success: boolean; data: any }> {
    return this.http.get<{ success: boolean; data: any }>(
      `${this.prod.link}/appareils/appareilArrayOfStatut`
    );
  }
  getAppareilsOfStock(id: any): Observable<{ success: boolean; data: Appareil[] }> {
    return this.http.get<{ success: boolean; data: Appareil[] }>(
      ` ${this.prod.link}/appareils?stockId=${id}`
    );
  }
  getAppareilsOfcategorie(id: any): Observable<{ success: boolean; data: Appareil[] }> {
    return this.http.get<{ success: boolean; data: Appareil[] }>(
      ` ${this.prod.link}/appareils?categorieId=${id}`
    );
  }
  getAppareilsOfetat(etat: any): Observable<{ success: boolean; data: Appareil[] }> {
    return this.http.get<{ success: boolean; data: Appareil[] }>(
      ` ${this.prod.link}/appareils?etat=${etat}`
    );
  }
  getAppareilsOfstatut(statut: any): Observable<{ success: boolean; data: Appareil[] }> {
    return this.http.get<{ success: boolean; data: Appareil[] }>(
      ` ${this.prod.link}/appareils?status=${statut}`
    );
  }
  addAparreil(appareil: any): Observable<{ success: boolean; data: Appareil }> {
    return this.http.post<{ success: boolean; data: Appareil }>(
      `${this.prod.link}/appareils`,
      appareil
    );
  }
  getAppareil(id: string): Observable<{ success: boolean; data: Appareil }> {
    return this.http.get<{ success: boolean; data: Appareil }>(
      `${this.prod.link}/appareils/` + id
    );
  }


  editAppareil(
    id: string,
    appareil
  ): Observable<{ success: boolean; data: any }> {
    return this.http.put<{ success: boolean; data: any }>(
      `${this.prod.link}/appareils/` + id,
      appareil
    );
  }
  editAppareil2(
    id: any,
    appareil
  ): Observable<{ success: boolean; data: any }> {
    return this.http.put<{ success: boolean; data: any }>(
      `${this.prod.link}/appareils/` + id + `/update`,
      appareil
    );
  }
  deleteAppareil(id: string): Observable<{ success: boolean; data: {} }> {
    return this.http.delete<{ success: boolean; data: {} }>(
      `${this.prod.link}/appareils/` + id
    );
  }
}
