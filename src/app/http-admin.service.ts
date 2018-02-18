import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from './AppConstants';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpAdminService {


  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {
  }

  getAdminStatus() {
    const API_ENDPOINT = 'admin/';
    return Observable.fromPromise(this.user.getIdToken(true))
      .switchMap((idToken: string) => {
        console.log(idToken);
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.get(AppConstants.API_BASE_URL.concat(API_ENDPOINT), { headers });
      });
  }

  getPreRegistrations(limit?: number) {
    const API_ENDPOINT = 'admin/preregistered';
    return Observable.fromPromise(new Promise((resolve, reject) => {
      this.afAuth.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user)
        } else {
          reject("NO USER");
        }
      });
    })).switchMap((user) => {
      console.log(user);
          return Observable.fromPromise(user.getIdToken(true))
            .switchMap((idToken: string) => {
              console.log(idToken);
              let headers = new HttpHeaders();
              headers = headers.set('idtoken', idToken);
              return this.http.get(AppConstants.API_BASE_URL.concat(API_ENDPOINT), { headers });
            });
        }, (error) => {
          console.error(error);
        });
  }

}
