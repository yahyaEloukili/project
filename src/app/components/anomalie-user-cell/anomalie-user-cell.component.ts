// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-anomalie-user-cell',
//   templateUrl: './anomalie-user-cell.component.html',
//   styleUrls: ['./anomalie-user-cell.component.css']
// })
// export class AnomalieUserCellComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { UserService } from "../../services/user.service";
@Component({
  selector: 'app-anomalie-user-cell',
  templateUrl: './anomalie-user-cell.component.html',
  styleUrls: ['./anomalie-user-cell.component.css']
})
export class AnomalieUserCellComponent implements OnInit, ICellRendererAngularComp {
  cellValue;
  user: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }
  agInit(params: any) {

    this.cellValue = params.value;
    this.userService.getUser(this.cellValue).subscribe(user => {
      this.user = user.data.nom;

    })

  }
  refresh(params: any): boolean {
    this.cellValue = params.value;
    this.userService.getUser(this.cellValue).subscribe(user => {
      this.user = user.data.nom;

    })

    return true;
  }
}
