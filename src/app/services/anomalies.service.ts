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
import { prod } from "../prod/prod";
@Injectable({
  providedIn: 'root'
})
export class AnomaliesService {

  constructor(private http: HttpClient, private prod: prod) { }
  getAnomalies(): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(
      `${this.prod.link}/anomalies/`
    );
  }
  getAnomalie(id): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(
      `${this.prod.link}/anomalies/` + id
    );
  }
  updateAnomalie(id, anomalie: any): Observable<{ success: boolean; data: any[] }> {
    return this.http.put<{ success: boolean; data: any[] }>(
      `${this.prod.link}/anomalies/` + id, anomalie
    );
  }
  getAnamolieOfSUser(userId: any): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(
      `${this.prod.link}/anomalies?userId=` + userId
    );
  }
  getAnamolieOfSAppareil(appareilId: any): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(
      `${this.prod.link}/anomalies?appareilId=` + appareilId
    );
  }
}
