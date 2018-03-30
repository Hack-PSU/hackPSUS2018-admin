import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationTableComponent } from './registration-table/registration-table.component'
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AuthGuard } from './AuthGuard';
import { AngularFireAuth } from 'angularfire2/auth';
import { PreRegistrationTableComponent } from './pre-registration-table/pre-registration-table.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'preregistrations', component: PreRegistrationTableComponent },
  { path: 'registrations', component: RegistrationTableComponent },
  { path: 'users', component: ManageUsersComponent },

import { HttpAdminService } from './http-admin.service';
import { SendEmailComponent } from './send-email/send-email.component';
import { VisComponent } from './vis/vis.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'preregistrations', component: PreRegistrationTableComponent, canActivate: [AuthGuard] },
  { path: 'registrations', component: RegistrationTableComponent, canActivate: [AuthGuard], data: { privilegeLevel: '3' } },
  { path: 'users', component: ManageUsersComponent, canActivate: [AuthGuard] , data: { privilegeLevel: '3' } },
  { path: 'email', component: SendEmailComponent, data: { privilegeLevel: '3' } },
    { path: 'vis', component: VisComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AngularFireAuth
  ],
  declarations: [],
})
export class AppRoutingModule {
}
