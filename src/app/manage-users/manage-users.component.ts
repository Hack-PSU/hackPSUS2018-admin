import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpAdminService } from '../http-admin.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  providers: [
    HttpAdminService,
  ],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  private user: firebase.User;
  private totalOptions = [{ value: 1, text: 'Volunteer' }, { value: 2, text: 'Team Member' }, { value: 3, text: 'Exec' }, {
    value: 4,
    text: 'Tech-exec',
  }];

  public level: number;
  public email: string;
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  public options: { text, value }[];

  constructor(public adminService: HttpAdminService, public afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.adminService.getAdminStatus(user)
          .subscribe((adminData) => {
            this.options = this.totalOptions.slice(0, adminData.privilege);
          })
      } else {
        console.error('NO USER');
      }
    });
  }

  makeAdmin(email: string) {
    console.log(email);
    if (email != null) {
      this.adminService.getUserUID(this.user, email).subscribe((user) => {
        console.log(user);
        this.adminService.elevateUser(this.user, user.uid, this.level.toString()).subscribe((resp) => {
          console.log(resp);
        },                                                                       (error) => {
          console.error(error);
        });
      },                                                       (error) => {
        console.error(error);
      });
    }
  }

}
