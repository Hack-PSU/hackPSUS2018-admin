import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegistrationTableComponent } from '../components/registration-table/registration-table.component'
import { ManageUsersComponent } from '../components/manage-users/manage-users.component';
import { AuthGuard } from './AuthGuard';
import { PreRegistrationTableComponent } from '../components/pre-registration-table/pre-registration-table.component';
import { HttpAdminService } from '../services/http-admin/http-admin.service';
import { LiveUpdateComponent } from '../components/live-update/live-update.component';
import { SendEmailComponent } from '../components/send-email/send-email.component';
import { ManageRsvpComponent } from '../components/manage-rsvp/manage-rsvp.component';
import { ManageLocationsComponent } from '../components/manage-locations/manage-locations.component';
import { ExtraCreditClassesComponent } from '../components/extra-credit-classes/extra-credit-classes.component';
import { ManageEventsComponent } from '../components/manage-events/manage-events.component';
import { VisComponent } from '../components/vis/vis.component';
import { UserDataComponent } from '../components/user-data/user-data.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ManageAdminComponent } from '../components/manage-admin/manage-admin.component';
import { StatisticsComponent } from '../components/statistics/statistics.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {  privilegeLevel: '1' } },
  { path: 'userdata', component: UserDataComponent, canActivate: [AuthGuard], data: {  privilegeLevel: '2' }},
  { path: 'admin', component: ManageAdminComponent, canActivate: [AuthGuard], data: {  privilegeLevel: '4' }},
  { path: 'stats', component: StatisticsComponent, canActivate: [AuthGuard], data: { privilegeLevel: '1'}},
  { path: 'preregistrations', component: PreRegistrationTableComponent, canActivate: [AuthGuard] },
  { path: 'live', component: LiveUpdateComponent, canActivate: [AuthGuard], data: {  privilegeLevel: '1' } },
  { path: 'registrations', component: RegistrationTableComponent, canActivate: [AuthGuard], data: { privilegeLevel: '2' } },
  { path: 'users', component: ManageUsersComponent, canActivate: [AuthGuard], data: { privilegeLevel: '1' } },
  { path: 'email', component: SendEmailComponent, data: { privilegeLevel: '3' } },
  { path: 'rsvp', component: ManageRsvpComponent, canActivate: [AuthGuard], data: { privilegeLevel: '3' } },
  { path: 'classes', component: ExtraCreditClassesComponent, canActivate: [AuthGuard], data: { privilegeLevel: '3' } },
  { path: 'events', component: ManageEventsComponent, canActivate: [AuthGuard], data: { privilegeLevel: '3' } },
  { path: 'locations', component: ManageLocationsComponent, canActivate: [AuthGuard], data: { privilegeLevel: '3' } },
  { path: 'vis', component: VisComponent, canActivate: [AuthGuard], data: { privilegeLevel: '3' } },
  { path: '**', component: LoginComponent }
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
