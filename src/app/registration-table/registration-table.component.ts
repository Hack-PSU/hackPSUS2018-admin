import { Component, OnInit } from '@angular/core';
import { PreRegistrationModel } from '../pre-registration-model'
import { HttpAdminService } from '../http-admin.service';

@Component({
  selector: 'app-registration-table',
  providers: [HttpAdminService],
  templateUrl: './registration-table.component.html',
  styleUrls: ['./registration-table.component.css']
})
export class RegistrationTableComponent implements OnInit {
  public userArray:any = [{uid: "27349827349", email: "afjasldfkjalskdfj"}];

  constructor(public adminService: HttpAdminService) {}

  ngOnInit() {
  	// this.adminService.getPreRegistrations().subscribe();
  	this.adminService.getPreRegistrations().subscribe((data) => {
  		console.log(data);
  		this.userArray = data;
  	}, (error) => {
  		console.error(error);
  	});
  }

}
