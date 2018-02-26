import { Component, OnInit, ViewChild, NgModule, AfterViewInit, AfterViewChecked } from '@angular/core';
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
  private privSelect = -1;
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
    this.displayedColumns = []; //RegistrationTableComponent.regCols;
    this.dataSource.data = [];
    this.adminService.getRegistrations(this.user).subscribe((data) => {
      console.log(data);
      this.displayedColumns = RegistrationTableComponent.regCols;
      this.dataSource.data = data;
      console.log('I am done, no errors');
    }, (error) => {
      console.error("SUSH BE CRAY");
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

  makeAdmin(email: string) {
    console.log(email);
    if(email != null) {
      this.adminService.getUserUID(this.user, email).subscribe((test) => {
        console.log(test);
        this.adminService.elevateUser(this.user, test.uid, '3').subscribe((resp) => {
          console.log(resp);
        }, (error) => {
          console.error(error);
        });
      }, (error) => {
          console.error(error);
      });
    }
  }
}