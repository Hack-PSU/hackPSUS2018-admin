import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpAdminService } from '../http-admin.service';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-registration-table',
  providers: [HttpAdminService],
  templateUrl: './registration-table.component.html',
  styleUrls: ['./registration-table.component.css'],
})

export class RegistrationTableComponent implements OnInit, AfterViewInit {
  private static regCols = ['firstname', 'lastname', 'email', 'uid'];
  displayedColumns = RegistrationTableComponent.regCols;
  public dataSource = new MatTableDataSource<any>([]);
  private user: firebase.User;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) table: MatSort;

  constructor(public adminService: HttpAdminService, public afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.onRegistrationClick();
      } else {
        console.error('NO USER');
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.table;
  }

  applyFilter(filterValue: string) {
    let mFilterValue = filterValue.trim();
    mFilterValue = filterValue.toLowerCase();
    this.dataSource.filter = mFilterValue;
  }



  onRegistrationClick() {
    this.displayedColumns = []; // RegistrationTableComponent.regCols;
    this.dataSource.data = [];
    this.adminService.getRegistrations(this.user).subscribe((data) => {
      console.log(data);
      this.displayedColumns = RegistrationTableComponent.regCols;
      this.dataSource.data = data;
      console.log('I am done, no errors');
    },                                                      (error) => {
      console.error('SUSH BE CRAY');
      console.error(error);
    });
  }
}
