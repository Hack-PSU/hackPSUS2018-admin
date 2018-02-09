import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(public afAuth: AngularFireAuth, private router: Router) {
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.error(error);
    });
  }

  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((response) => {
        console.log(response);
      }).catch((error) => {
      console.error(error);
    });
  }

  loginGithub() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        console.log(response);
      }).catch((error) => {
      console.error(error);
    });
  }

  onLogin() {
    this.router.navigate(['/']);
  }
}
