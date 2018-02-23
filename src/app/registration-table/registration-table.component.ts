import { Component, OnInit , ViewChild, NgModule} from '@angular/core';
import { PreRegistrationModel } from '../pre-registration-model'
import { RegistrationModel } from '../registration-model'
import { HttpAdminService } from '../http-admin.service';

import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-registration-table',
  providers: [HttpAdminService],
  templateUrl: './registration-table.component.html',
  styleUrls: ['./registration-table.component.css'],
})

export class RegistrationTableComponent implements OnInit {
  public userArray:any = [];


  displayedColumns = ['email', 'uid'];
  dataSource = new MatTableDataSource(Testing);
  
  constructor(public adminService: HttpAdminService) {}

  ngOnInit() {
  	this.adminService.getPreRegistrations().subscribe((data) => {
  		console.log(data);
  		this.userArray = data;
  	}, (error) => {
  		console.error(error);
  	});
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onRegistrationClick() {
    this.adminService.getRegistrations().subscribe((data) => {
      console.log(data);
      this.userArray = data;
    }, (error) => {
      console.error(error);
    });
  }

  onPreRegistrationClick() {
    this.adminService.getPreRegistrations().subscribe((data) => {
      console.log(data);
      this.userArray = data;
    }, (error) => {
      console.error(error);
    });
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
