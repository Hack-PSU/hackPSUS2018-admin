import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserViewComponent } from './user-view/user-view.component';
import { CustomMaterialModule } from './custom.materials'
import { RegistrationTableComponent } from './registration-table/registration-table.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { PreRegistrationTableComponent } from './pre-registration-table/pre-registration-table.component';
import { AddEmailDialogComponent, SendEmailComponent } from './send-email/send-email.component';
import { EmailListService } from './email-list.service';
import { HttpAdminService } from './http-admin.service';
import { ChartsModule } from 'ng2-charts';
import { VisComponent } from './vis/vis.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
//import { NgxUIModule } from '';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    UserViewComponent,
    RegistrationTableComponent,
    ManageUsersComponent,
    PreRegistrationTableComponent,
    SendEmailComponent,
    AddEmailDialogComponent,
    VisComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    CustomMaterialModule,
      NgxChartsModule,
      //NgxUIModule,
  ],
  entryComponents: [AddEmailDialogComponent],
  providers: [EmailListService, HttpAdminService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
