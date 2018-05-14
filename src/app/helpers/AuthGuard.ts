import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppConstants } from './AppConstants';
import { HttpAdminService } from '../services/http-admin/http-admin.service';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AngularFireAuth, private router: Router, private httpService: HttpAdminService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkLogin(route.data.privilegeLevel);
  }

  checkLogin(privilegeLevel= '0'): Observable<boolean> {
    if (this.authService.auth.currentUser) {
      return this.httpService.getAdminStatus(this.authService.auth.currentUser)
        .pipe(
          map((adminData) => {
            if (adminData.admin) {
              if (adminData.privilege >= privilegeLevel) {
                return true;
              }
              return false;
            }
            this.authService.auth.signOut();
            this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
            return false;
          }),
          catchError(() => {
            this.authService.auth.signOut();
            this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
            return Observable.of(false);
          }),
        )
    }
    this.router.navigate([AppConstants.LOGIN_ENDPOINT]);
  }
}
