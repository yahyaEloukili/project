import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user-mouvement-cell',
  templateUrl: './user-mouvement-cell.component.html',
  styleUrls: ['./user-mouvement-cell.component.css']
})
export class UserMouvementCellComponent implements OnInit, ICellRendererAngularComp {
  cellValue;
  user: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }
  agInit(params: any) {

    this.cellValue = params.value;
    this.userService.getUser(this.cellValue).subscribe(user => {
      if (user && user.data) {
        this.user = user.data.nom;
      }

    })

  }
  refresh(params: any): boolean {
    this.cellValue = params.value;
    this.userService.getUser(this.cellValue).subscribe(user => {
      if (user && user.data) {
        this.user = user.data.nom;
      }

    })

    return true;
  }

}
