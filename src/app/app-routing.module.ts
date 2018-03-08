import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationTableComponent } from './registration-table/registration-table.component'
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AuthGuard } from './AuthGuard';
import { AngularFireAuth } from 'angularfire2/auth';
import { PreRegistrationTableComponent } from './pre-registration-table/pre-registration-table.component';
import { HttpAdminService } from './http-admin.service';
import { LiveUpdateComponent } from './live-update/live-update.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'preregistrations', component: PreRegistrationTableComponent, canActivate: [AuthGuard] },
  { path: 'registrations', component: RegistrationTableComponent, canActivate: [AuthGuard] },
  { path: 'users', component: ManageUsersComponent, canActivate: [AuthGuard] },
  { path: 'live', component: LiveUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AngularFireAuth,
    HttpAdminService,
  ],
  declarations: [],
})
export class AppRoutingModule {
}
