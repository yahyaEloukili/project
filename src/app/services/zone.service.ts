import { Injectable } from "@angular/core";
import { Appareil } from "../models/appareils";
import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { of } from "rxjs";
import "rxjs/add/operator/catch";
import { error } from "protractor";
import { Zone } from "../models/zone";
import { prod } from "../prod/prod";
@Injectable({
  providedIn: "root"
})
export class ZoneService {
  constructor(private http: HttpClient, private prod: prod) { }
  getZones(): Observable<{ success: boolean; data: Zone[] }> {
    return this.http.get<{ success: boolean; data: Zone[] }>(
      ` ${this.prod.link}/zones/`
    );
  }
  addZone(zone: Zone): Observable<{ success: boolean; data: Zone }> {
    return this.http.post<{ success: boolean; data: Zone }>(
      ` ${this.prod.link}/zones`,
      zone
    );
  }
  getZoneWithSomeFields(id?: any): Observable<{
    success: boolean;
    data: Zone[];
  }> {

    return this.http.get<{ success: boolean; data: Zone[] }>(
      ` ${this.prod.link}/zones?select=nom`
    );

  }
  getZone(id: string): Observable<{ success: boolean; data: Zone }> {
    return this.http.get<{ success: boolean; data: Zone }>(
      `${this.prod.link}/zones/` + id
    );
  }

  editZone(id: string, zone): Observable<{ success: boolean; data: Zone }> {
    return this.http.put<{ success: boolean; data: Zone }>(
      `${this.prod.link}/zones/` + id,
      zone
    );
  }
  deleteZone(id: string): Observable<{ success: boolean; data: {} }> {
    return this.http.delete<{ success: boolean; data: {} }>(
      `${this.prod.link}/zones/` + id
    );
  }
}
