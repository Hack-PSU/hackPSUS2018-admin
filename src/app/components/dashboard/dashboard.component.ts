import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpAdminService } from '../../services/http-admin/http-admin.service';

import { AngularFireAuth } from 'angularfire2/auth';

import { Router } from '@angular/router';
import { AppConstants } from '../../helpers/AppConstants';

@Component({
  selector: 'app-dashboard',
  providers: [
    HttpAdminService,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	get user(): firebase.User {
		return this._user;
	}

	set user(value: firebase.User) {
		this._user = value;
	}

  	private _user: firebase.User;
	constructor(
		public adminService: HttpAdminService,
		public afAuth: AngularFireAuth,
		private router: Router,
	){}

	ngOnInit() {
	    this.afAuth.auth.onAuthStateChanged((user) => {
	      if (user) {
	        this._user = user;
	      } else {
	        console.error('NO USER');
	      }
	    });
  	}
}


