import { Injectable } from "@angular/core";
import { Appareil } from "../models/appareils";
import { HttpHeaders } from "@angular/common/http";
import { CategorieService } from "./categorie.service";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { of } from "rxjs";
import "rxjs/add/operator/catch";
import { error } from "protractor";
import { Mouvement } from '../models/Mouvement';
import { prod } from "../prod/prod";

@Injectable({
  providedIn: 'root'
})
export class MouvementsService {

  constructor(private http: HttpClient, private prod: prod) { }
  getMouvements(): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(
      `${this.prod.link}/mouvements?typeMouvement=RECUPERATION`
    );
  }
  getMouvements2(): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(
      `${this.prod.link}/mouvements?typeMouvement=DEPOT`
    );
  }
  getMouvementsOfSUser(userId: any): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(
      `${this.prod.link}/mouvements?userId=` + userId + '&typeMouvement=RECUPERATION'
    );
  }
  getMouvementsOfSUser2(userId: any): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(
      `${this.prod.link}/mouvements?userId=` + userId + '&typeMouvement=DEPOT'
    );
  }
  getMouvementsOfAppareil(appareilId: any): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(
      `${this.prod.link}/mouvements?appareilId=` + appareilId + '&typeMouvement=RECUPERATION'
    );
  }
  getMouvementsOfAppareil2(appareilId: any): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(
      `${this.prod.link}/mouvements?appareilId=` + appareilId + '&typeMouvement=DEPOT'
    );
  }
  getMouvementsOfType(type: any): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(
      `${this.prod.link}/mouvements?typeMouvement=` + type
    );
  }
  getMouvementDetail(id: Mouvement): Observable<{ success: boolean; data: any }> {
    return this.http.get<{ success: boolean; data: any }>(
      `${this.prod.link}/mouvements/` + id + `/full/detail`
    );
  }
  updateMouvement(id: any, data: any): Observable<{ success: boolean; data: any[] }> {
    return this.http.put<{ success: boolean; data: any[] }>(
      `${this.prod.link}/mouvements/` + id + "/update", data
    );
  }

  updateSeqMouvement(id1: any, id2: any, data: any): Observable<{ success: boolean; data: any[] }> {
    return this.http.put<{ success: boolean; data: any }>(
      `${this.prod.link}/seq_mvt/updateSeq_mvt/` + id1 + '/' + id2, data
    );
  }
  updatePieceMouvement(id1: any, id2: any, data: any): Observable<{ success: boolean; data: any[] }> {
    return this.http.put<{ success: boolean; data: any }>(
      `${this.prod.link}/seq_mvt/updatePiece_mvt/` + id1 + '/' + id2, data
    );
  }
}
