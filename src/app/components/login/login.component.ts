/**
 * TODO: Add docstring explaining component
 */
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { HttpAdminService } from '../../services/http-admin/http-admin.service';
import { LoginModel } from '../../models/login-model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  providers: [HttpAdminService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  public errors: Error = null;
  public model: LoginModel;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(public afAuth: AngularFireAuth, private router: Router, private adminService: HttpAdminService) {
    this.model = new LoginModel();
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        this.onLogin();
      }).catch((error) => {
        this.errors = error;
        console.error(error);
      });
  }

  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((response) => {
        this.onLogin();
      }).catch((error) => {
        this.errors = error;
        console.error(error);
      });
  }

  loginGithub() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(() => {
        this.onLogin();
      }).catch((error) => {
        this.errors = error;
        console.error(error);
      });
  }

  loginEmail() {
    if (this.model.email && this.model.password) {
      this.afAuth.auth.signInWithEmailAndPassword(this.model.email, this.model.password)
        .then(() => {
          this.onLogin();
        }).catch((error) => {
          this.errors = error;
          console.error(error);
        });
    }
  }

  onLogin() {
    const listener = this.afAuth.auth.onAuthStateChanged((user) => {
      listener();
      if (user) {
        this.adminService.getAdminStatus(user).subscribe((response) => {
          this.router.navigate(['/users']);
        },                                               (error) => {
          this.errors = error;
          console.error(error);
          this.afAuth.auth.signOut();
          this.router.navigate(['/login']);
        });
      } else {
        this.afAuth.auth.signOut();
        this.router.navigate(['/login']);
      }
    });
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
}
