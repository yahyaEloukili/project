import { Injectable } from "@angular/core";
import { Appareil } from "../models/appareils";
import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { of } from "rxjs";
import "rxjs/add/operator/catch";
import { error } from "protractor";
import { Categorie } from "../models/categorie";
import { prod } from "../prod/prod";
@Injectable({
  providedIn: "root"
})
export class CategorieService {
  constructor(private http: HttpClient, private prod: prod) { }

  getCategories(): Observable<{ success: boolean; data: Categorie[] }> {
    return this.http.get<{ success: boolean; data: Categorie[] }>(
      `${this.prod.link}/categories/`
    );
  }
  getCategories2(): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(
      `${this.prod.link}/mouvements/duration/avg`
    );
  }
  getCategorieWithSomeFields(id?: any): Observable<{
    success: boolean;
    data: Categorie[];
  }> {

    return this.http.get<{ success: boolean; data: Categorie[] }>(
      `${this.prod.link}/categories?select=name,delay`
    );

  }
  getCategoriesDalay(): Observable<{ success: boolean; data: any }> {
    return this.http.get<{ success: boolean; data: any }>(
      `${this.prod.link}/categories/categorieArray`
    );
  }
  addCategorie(
    categorie: Categorie
  ): Observable<{ success: boolean; data: Categorie }> {
    return this.http.post<{ success: boolean; data: Categorie }>(
      `${this.prod.link}/categories`,
      categorie
    );
  }
  getCategorie(id: any): Observable<{ success: boolean; data: Categorie }> {
    return this.http.get<{ success: boolean; data: Categorie }>(
      `${this.prod.link}/categories/` + id
    );
  }

  editCategorie(
    id: number,
    categorie
  ): Observable<{ success: boolean; data: Categorie }> {
    return this.http.put<{ success: boolean; data: Categorie }>(
      `${this.prod.link}/categories/` + id,
      categorie
    );
  }
  deleteCategorie(id: number): Observable<{ success: boolean; data: {} }> {
    return this.http.delete<{ success: boolean; data: {} }>(
      `${this.prod.link}/categories/` + id
    );
  }
}
