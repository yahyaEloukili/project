import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { of } from "rxjs";
import "rxjs/add/operator/catch";
import { error } from "protractor";
import { Stock } from "../models/stock";
import { prod } from "../prod/prod";
@Injectable({
  providedIn: "root"
})
export class StockService {
  constructor(private http: HttpClient, private prod: prod) { }

  getStocks(): Observable<{ success: boolean; data: Stock[] }> {
    return this.http.get<{ success: boolean; data: Stock[] }>(
      `${this.prod.link}/stocks/`
    );
  }
  addStock(stock: Stock): Observable<{ success: boolean; data: Stock }> {
    return this.http.post<{ success: boolean; data: Stock }>(
      `${this.prod.link}/stocks`,
      stock
    );
  }
  getStock(id: string): Observable<{ success: boolean; data: Stock }> {
    return this.http.get<{ success: boolean; data: Stock }>(
      `${this.prod.link}/stocks/` + id
    );
  }

  editStock(id: string, stock): Observable<{ success: boolean; data: Stock }> {
    return this.http.put<{ success: boolean; data: Stock }>(
      `${this.prod.link}/stocks/` + id,
      stock
    );
  }
  getStockWithSomeFields(id?: any): Observable<{
    success: boolean;
    data: Stock[];
  }> {

    return this.http.get<{ success: boolean; data: Stock[] }>(
      `${this.prod.link}/stocks?select=nom`
    );

  }
  deleteStock(id: string): Observable<{ success: boolean; data: {} }> {
    return this.http.delete<{ success: boolean; data: {} }>(
      `${this.prod.link}/stocks/` + id
    );
  }
}
