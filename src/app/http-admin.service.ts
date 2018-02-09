import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from './AppConstants';
import { AngularFireAuth} from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpAdminService {

  constructor(private http: HttpClient, private afAuth: AngularFireAuth){

  }

  getAdminStatus() {
    const API_ENDPOINT = 'admin/';
    return Observable.fromPromise(this.afAuth.auth.currentUser.getIdToken(true))
      .pipe(
        map((idToken: string) => {
          console.log(idToken);
          const headers = new HttpHeaders();
          headers.append('idtoken', idToken);
          return this.http.get(AppConstants.API_BASE_URL.concat(API_ENDPOINT), { headers });
        }),
      );
  }

}
