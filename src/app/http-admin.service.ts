import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConstants } from './AppConstants';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { PreRegistrationModel } from './pre-registration-model';
import { RegistrationModel } from './registration-model';

@Injectable()
export class HttpAdminService {

  constructor(private http: HttpClient) {
  }

  getAdminStatus(user: firebase.User) {
    const API_ENDPOINT = 'admin/';
    return Observable.fromPromise(user.getIdToken(true))
      .switchMap((idToken: string) => {
        let headers = new HttpHeaders();
        headers = headers.set('idtoken', idToken);
        return this.http.get(AppConstants.API_BASE_URL.concat(API_ENDPOINT), { headers });
      });
  }

  getPreRegistrations(user: firebase.User, limit?: number): Observable<PreRegistrationModel[]> {
    const API_ENDPOINT = 'admin/preregistered';
    return Observable.fromPromise(user.getIdToken(true))
      .switchMap((idToken: string) => {
        let myHeader = new HttpHeaders();
        let params = new HttpParams();
        myHeader = myHeader.set('idtoken', idToken);
        if (limit) {
          params = params.set('limit', limit.toString());
        }
        //let options = new RequestOptions({ headers: headers, params: params });
        return this.http.get<PreRegistrationModel[]>(AppConstants.API_BASE_URL.concat(API_ENDPOINT), { headers: myHeader, params: params });
      });
  }

  getRegistrations(user: firebase.User, limit?: number): Observable<RegistrationModel[]> {
    const API_ENDPOINT = 'admin/registered';
    return Observable.fromPromise(user.getIdToken(true))
      .switchMap((idToken: string) => {
        let myHeader = new HttpHeaders();
        let params = new HttpParams();
        myHeader = myHeader.set('idtoken', idToken);
        if (limit) {
          params = params.set('limit', limit.toString());
        }
        //let options = new RequestOptions({ headers: headers, params: params });
        return this.http.get<RegistrationModel[]>(AppConstants.API_BASE_URL.concat(API_ENDPOINT), { headers: myHeader, params: params });
      });
  }

  makeUserAdmin() {

  }


}
