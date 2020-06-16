import { Injectable } from "@angular/core";
import { Piece_rechange } from "../models/Piece_rechange";
import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { of } from "rxjs";
import "rxjs/add/operator/catch";
import { prod } from "../prod/prod";
import { error } from "protractor";

@Injectable({
  providedIn: "root"
})
export class PieceRechangeService {
  piece_rechanges: Piece_rechange[];
  private source = new BehaviorSubject<Piece_rechange>({
    id: null,
    nom: null,
    code: null,
    marque: null
  });
  constructor(private http: HttpClient, private prod: prod) { }
  getPieces(): Observable<{ success: boolean; data: Piece_rechange[] }> {
    return this.http.get<{ success: boolean; data: Piece_rechange[] }>(
      `${this.prod.link}/pieces_rechange`
    );
  }
  addPiece(
    piece_rechange: Piece_rechange
  ): Observable<{ success: boolean; data: Piece_rechange }> {
    return this.http.post<{ success: boolean; data: Piece_rechange }>(
      `${this.prod.link}/pieces_rechange`,
      piece_rechange
    );
  }
  getPiece(
    id: string
  ): Observable<{ success: boolean; data: Piece_rechange }> {
    return this.http.get<{ success: boolean; data: Piece_rechange }>(
      `${this.prod.link}/pieces_rechange/` + id
    );
  }

  editPiece(
    id: string,
    Piece
  ): Observable<{ success: boolean; data: Piece_rechange }> {
    return this.http.put<{ success: boolean; data: Piece_rechange }>(
      `${this.prod.link}/pieces_rechange/` + id,
      Piece
    );
  }


  deletePiece(id: string): Observable<{ success: boolean; data: {} }> {
    return this.http.delete<{ success: boolean; data: {} }>(
      `${this.prod.link}/pieces_rechange/` + id
    );
  }
  setSelectedPiece(piece_rechange: Piece_rechange) {
    this.source.next(piece_rechange);
  }
}
