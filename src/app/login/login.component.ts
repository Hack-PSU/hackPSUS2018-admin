import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { HttpAdminService } from '../http-admin.service';

@Component({
  selector: 'app-login',
  providers: [HttpAdminService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(public afAuth: AngularFireAuth, private router: Router, private adminService: HttpAdminService) {
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        this.onLogin();
      }).catch((error) => {
        console.error(error);
    });
  }

  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((response) => {
        this.onLogin();
      }).catch((error) => {
      console.error(error);
    });
  }

  loginGithub() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        this.onLogin();
      }).catch((error) => {
      console.error(error);
    });
  }

  onLogin() {
    this.adminService.getAdminStatus().subscribe((response) => {
      this.router.navigate(['/']);
    },                                           (error) => {
      console.error(error);
      this.afAuth.auth.signOut();
      this.router.navigate(['/login']);
    });
  }
}
