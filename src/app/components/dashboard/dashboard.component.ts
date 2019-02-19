/*
 * Dashboard style landing page when logging into the Admin Web Application. It has card style links for
 * easy access to different pages. Each link is protected by the router guard.
 */
import { Component, OnInit } from '@angular/core';
import { ICountModel } from '../../models/count-model';
import { HttpAdminService } from '../../services/http-admin/http-admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  providers: [
               HttpAdminService,
             ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  constructor(
    public adminService: HttpAdminService,
    private activatedRoute: ActivatedRoute
    ) {
  }

  /*
   * Local private integers representing the counts in the latest stats header.
   */
  public preRegStatNumber = -1;
  public regStatNumber = -1;
  public rsvpStatNumber = -1;
  public checkInStatNumber = -1;
  
  /*
   * Error array used to display error messages
   */
  public errors: Error = null;

  /**
   * On the initilization of all angular components, execute the functions
   *
   * Retrieves the current user from authentication then sets the local variable
   *
   * @exception: Failure on the auth service will cause an error to be displayed on the /userdata/ route page
   * @exception: Issue with the user not existing in the auth service database will cause an error to be
   *             displayed on the /userdata/ route page
   */
  ngOnInit() {
    this.activatedRoute.data
      .subscribe((user) => {
        this.updateStatHeader();
      });
  }

  /**
   * Updates the latest users card with the current counts
   *
   * @exception: Failure with the admin service with cause an error to be displayed on the /userdata/ route page
   */
  updateStatHeader() {
    this.adminService.getAllUserCount().subscribe((data: ICountModel) => {
      this.preRegStatNumber = data.preregistration_count;
      this.regStatNumber = data.registration_count;
      this.rsvpStatNumber = data.rsvp_count;
      this.checkInStatNumber = data.checkin_count;
    },                                            (error) => {
      this.errors = new Error('Error: Issue with getting the number of users');
      console.error(error);
    });
  }
}


