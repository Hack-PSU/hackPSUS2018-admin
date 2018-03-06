import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserViewComponent } from './user-view/user-view.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomMaterialModule } from './custom.materials'
import { RegistrationTableComponent } from './registration-table/registration-table.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { PreRegistrationTableComponent } from './pre-registration-table/pre-registration-table.component';
import { AddEmailDialogComponent, SendEmailComponent } from './send-email/send-email.component';
import { EmailListService } from './email-list.service';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    CustomMaterialModule,
  ],
  entryComponents: [AddEmailDialogComponent],
  providers: [EmailListService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
