import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from "../../services/categorie.service";

@Component({
  selector: 'app-customized-cell',
  templateUrl: './customized-cell3.component.html',
  styleUrls: ['./customized-cell3.component.css']
})
export class CustomizedCell3Component implements OnInit, ICellRendererAngularComp {
  cellValue;
  categorie;

  constructor(private categorieService: CategorieService) { }

  ngOnInit(): void {

  }
  agInit(params: any) {

    this.cellValue = params.value;
    this.categorieService.getCategorie(this.cellValue).subscribe(categorie => {
      this.categorie = categorie.data.name;

    })

  }
  refresh(params: any): boolean {
    this.cellValue = params.value;
    this.categorieService.getCategorie(this.cellValue).subscribe(categorie => {
      this.categorie = categorie.data.name;

    })

    return true;
  }



}
