import { Component, OnInit, ViewChild, NgModule, AfterViewInit } from '@angular/core';
import { HttpAdminService } from '../http-admin.service';

import { MatPaginator, MatSort, MatTabChangeEvent, MatTableDataSource } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { PreRegistrationModel } from '../pre-registration-model';

@Component({
  selector: 'app-registration-table',
  providers: [HttpAdminService],
  templateUrl: './registration-table.component.html',
  styleUrls: ['./registration-table.component.css'],
})

export class RegistrationTableComponent implements OnInit, AfterViewInit {
  private static preRegCols = ['email', 'uid'];
  private static regCols = ['firstname', 'lastname', 'email', 'uid'];
  displayedColumns = RegistrationTableComponent.preRegCols;
  public dataSource = new MatTableDataSource<any>([]);
  private user: firebase.User;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) table: MatSort;
  
  constructor(public adminService: HttpAdminService, public afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.onPreRegistrationClick();
      } else {
        console.error("NO USER");
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.table;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }



  onRegistrationClick() {
    this.displayedColumns = [];
    this.dataSource.data = [];
    this.adminService.getRegistrations(this.user).subscribe((data) => {
      console.log(data);
      this.displayedColumns = RegistrationTableComponent.regCols;
      this.dataSource.data = data;
    }, (error) => {
      console.error(error);
    });
  }

  onPreRegistrationClick() {
    this.displayedColumns = [];
    this.dataSource.data = [];
    this.adminService.getPreRegistrations(this.user).subscribe((data) => {
      console.log(data);
      this.displayedColumns = RegistrationTableComponent.preRegCols;
      this.dataSource.data = data;
    }, (error) => {
      console.error(error);
    });
  }

  onTabChange(event: MatTabChangeEvent) {
    switch(event.index) {
      case 0:
        this.onPreRegistrationClick();
        break;
      case 1:
        this.onRegistrationClick();
        break;
    }
  }
}

export interface User {
  email: string;
  uid: string;
}

const Testing: User[] = [
  
  {uid: '501920391237', email: 'Goluck@gmail.com'},
  {uid: '798709812313', email: 'Golem@gmail.com'},
  {uid: '802985350932', email: 'Toaster@gmail.com'},
  {uid: '779490920399', email: 'Mankey@gmail.com'},
  {uid: '665589393989', email: 'Monkey@gmail.com'},
];
