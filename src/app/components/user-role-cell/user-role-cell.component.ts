import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user-role-cell',
  templateUrl: './user-role-cell.component.html',
  styleUrls: ['./user-role-cell.component.css']
})
export class UserRoleCellComponent implements OnInit, ICellRendererAngularComp {

  cellValue;
  user: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }
  agInit(params: any) {

    this.cellValue = params.value;


  }
  refresh(params: any): boolean {
    this.cellValue = params.value;


    return true;
  }

}
