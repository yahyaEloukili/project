// import { Component, OnInit, ViewChild, ElementRef, asNativeElements, AfterViewInit } from '@angular/core';
// import { CategorieService } from "../../services/categorie.service";
// import { AgGridAngular } from 'ag-grid-angular'
// import { NgClass } from '@angular/common';
// import { AppareilService } from "../../services/appareil.service";
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-test',
//   templateUrl: './test.component.html',
//   styleUrls: ['./test.component.css']
// })
// export class TestComponent implements OnInit {

//   @ViewChild('table') table: ElementRef;
//   dataTable: any;
//   count;
//   search;
//   currentClass;
//   totalButtons;
//   array = [];
//   iPrevious;
//   classPrevious = 'page-item disabled';
//   classNext = 'page-item';
//   iNext;
//   appareils;
//   hidden: boolean;
//   toStyle: any;
//   styleRef: string;
//   classStyle: boolean;
//   currentPage: any;
//   firstTime: boolean;
//   constructor(private router: Router, private appareilService: AppareilService) { }
//   searchData(ev) {

//     console.log(this.search);
//     if (this.search != '') {
//       this.hidden = true;
//     }
//     else {
//       this.hidden = false;
//     }
//     this.appareilService.getAppareils2(this.search).subscribe(appareils => {
//       console.log(appareils);
//       this.appareils = appareils.data;
//     })


//   }
//   onClickPrevious() {
//     this.firstTime = false;
//     this.classNext = 'page-item'
//     this.classStyle = true;
//     if (this.iPrevious) {
//       this.appareilService.getAppareils(this.iPrevious).subscribe(appareils => {
//         this.currentPage = appareils.page;
//         if (!appareils.pagination.prev) {
//           this.classPrevious = 'page-item disabled'


//         }
//         this.appareils = appareils.data;
//       })
//     }
//     this.iNext = this.iPrevious + 1;
//     this.iPrevious = this.iPrevious - 1;
//   }
//   onClickNext() {
//     this.firstTime = false;

//     this.classPrevious = 'page-item'
//     console.log(this.iNext);
//     if (this.iNext === this.totalButtons + 1) {
//       this.classNext = 'page-item disabled'
//     }
//     if (this.iNext) {
//       this.appareilService.getAppareils(this.iNext).subscribe(appareils => {
//         this.currentPage = appareils.page;
//         this.classStyle = true;
//         this.appareils = appareils.data;
//       })
//     } else {
//       this.iNext = 2;
//       this.appareilService.getAppareils(2).subscribe(appareils => {
//         this.currentPage = appareils.page;
//         this.classStyle = true;
//         this.appareils = appareils.data;
//       })
//     }
//     this.iPrevious = this.iNext - 1;
//     this.iNext = this.iNext + 1;
//   }
//   onClick(i) {
//     this.firstTime = false;
//     this.classStyle = true;
//     if (this.count % 10 === 0) {
//       if (i === this.totalButtons) {
//         this.classNext = 'page-item disabled'
//       } else {
//         this.classNext = 'page-item'
//       }
//     }
//     else {
//       if (i === this.totalButtons + 1) {
//         this.classNext = 'page-item disabled'
//       } else {
//         this.classNext = 'page-item'
//       }
//     }
//     if (i === 1) {
//       this.classPrevious = 'page-item disabled'
//     }
//     else {
//       this.classPrevious = 'page-item '
//     }

//     this.iPrevious = i - 1;
//     this.iNext = i + 1;
//     console.log(this.iNext, this.iPrevious);
//     this.appareilService.getAppareils(i).subscribe(appareils => {
//       console.log(appareils.page);
//       this.currentPage = appareils.page;
//       this.appareils = appareils.data;
//     })
//   }
//   ngOnInit(): void {
//     this.firstTime = true;
//     this.appareilService.getAppareils(1).subscribe(appareils => {
//       this.appareils = appareils.data;
//       this.count = appareils.total;
//       if (this.count <= 10) {
//         this.hidden = true;
//       }

//       this.totalButtons = parseInt((this.count / 10).toString());
//       console.log(this.count % 10, '$$$$$$$$$$$$$$');
//       if (this.count % 10 === 0) {
//         for (let i = 2; i < this.totalButtons + 1; i++) {
//           this.array.push(i);
//         }
//       } else {
//         for (let i = 2; i < this.totalButtons + 2; i++) {
//           this.array.push(i);
//         }
//       }
//       console.log(this.array);
//     })


//   }


// }
