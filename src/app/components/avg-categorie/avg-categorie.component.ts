import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { CategorieService } from "../../services/categorie.service";

@Component({
  selector: 'app-avg-categorie',
  templateUrl: './avg-categorie.component.html',
  styleUrls: ['./avg-categorie.component.css']
})
export class AvgCategorieComponent implements OnInit, ICellRendererAngularComp {

  cellValue;
  value;
  constructor(private categorieService: CategorieService) { }

  ngOnInit(): void {

  }
  agInit(params: any) {

    this.cellValue = params.value;
    this.categorieService.getCategories2().subscribe(categories => {
      let categorie2;
      categories.data.forEach(categorie => {
        if (categorie.id === this.cellValue) {
          categorie2 = categorie;
        }
      })
      if (categorie2) {
        this.value = Math.round(categorie2.delay / 1000 / 3600)
      } else {
        this.value = 0;
      }

    })


  }
  refresh(params: any): boolean {
    this.cellValue = params.value; this.cellValue = params.value;
    this.categorieService.getCategories2().subscribe(categories => {
      let categorie2;
      categories.data.forEach(categorie => {
        if (categorie.id === this.cellValue) {
          categorie2 = categorie;
        }
      })
      if (categorie2) {
        this.value = Math.round(categorie2.delay / 1000 / 3600)
      } else {
        this.value = 0;
      }

    })

    return true;
  }


}
