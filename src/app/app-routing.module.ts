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
import { SendEmailComponent } from './send-email/send-email.component';
import { ManageRsvpComponent } from './manage-rsvp/manage-rsvp.component';
import { ManageLocationsComponent } from './manage-locations/manage-locations.component';
import { ExtraCreditClassesComponent } from './extra-credit-classes/extra-credit-classes.component';
import { ManageEventsComponent } from './manage-events/manage-events.component';
import { VisComponent } from './vis/vis.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'preregistrations', component: PreRegistrationTableComponent, canActivate: [AuthGuard] },
  { path: 'registrations', component: RegistrationTableComponent, canActivate: [AuthGuard] },
  { path: 'users', component: ManageUsersComponent, canActivate: [AuthGuard] },
  { path: 'live', component: LiveUpdateComponent },
  { path: 'registrations', component: RegistrationTableComponent, canActivate: [AuthGuard], data: { privilegeLevel: '2' } },
  { path: 'users', component: ManageUsersComponent, canActivate: [AuthGuard] , data: { privilegeLevel: '1' } },
  { path: 'email', component: SendEmailComponent, data: { privilegeLevel: '3' } },
    { path: 'vis', component: VisComponent},
  { path: 'rsvp', component: ManageRsvpComponent, canActivate: [AuthGuard], data: { privilegeLevel: '3'}},
  { path: 'classes', component: ExtraCreditClassesComponent, canActivate: [AuthGuard], data: { privilegeLevel: '3'}},
  { path: 'events', component: ManageEventsComponent, canActivate: [AuthGuard], data: { privilegeLevel: '3'}},
  
  { path: 'locations', component: ManageLocationsComponent, canActivate: [AuthGuard], data: { privilegeLevel: '3'} },
  { path: 'vis', component: VisComponent, canActivate: [AuthGuard], data: { privilegeLevel: '3' } },
  { path: '**', component: ManageUsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    HttpAdminService,
  ],
  declarations: [],
})
export class AppRoutingModule {
}
