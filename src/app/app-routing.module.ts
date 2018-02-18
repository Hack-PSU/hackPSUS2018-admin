import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationTableComponent } from './registration-table/registration-table.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: RegistrationTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {
}
