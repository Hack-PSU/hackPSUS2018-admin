import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { PreRegistrationModel } from '../pre-registration-model'
import { RegistrationModel } from '../registration-model'
import { HttpAdminService } from '../http-admin.service';
import { SearchFilterPipe } from '../searchFilter.pipe';

@NgModule({
    declarations: [ SearchFilterPipe ]
})

@Component({
  selector: 'app-registration-table',
  providers: [HttpAdminService],
  templateUrl: './registration-table.component.html',
  styleUrls: ['./registration-table.component.css'],
})
export class RegistrationTableComponent implements OnInit {
  public userArray:any = [];

  constructor(public adminService: HttpAdminService) {}

  ngOnInit() {
  	this.adminService.getPreRegistrations().subscribe((data) => {
  		console.log(data);
  		this.userArray = data;
  	}, (error) => {
  		console.error(error);
  	});
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
