import { Component, OnInit } from '@angular/core';

import { AlertService } from 'ngx-alerts';
import { HttpAdminService } from 'app/services/http-admin/http-admin.service';

@Component({
  selector: 'app-manage-hackathon',
  providers: [
    HttpAdminService,
  ],
  templateUrl: './manage-hackathon.component.html',
  styleUrls: ['./manage-hackathon.component.css']
})
export class ManageHackathonComponent implements OnInit {

  public hackathon: string;
  public startDate: string;
  public endDate: string; // converted to epoch time

  constructor(
    public alertsService: AlertService,
    public adminService: HttpAdminService,
  ) {
  }

  ngOnInit() {
  }


  /**
   * Adds a new hackathon with the specified name
   *
   * @param name Name for the new hackathon
   * @exception: Failure with the admin service will cause an error to be displayed on the /hackathons/ route page
   */
  addHackathon(name: string) {
    if (name != null) {
      this.alertsService.success(`Adding ${name} as a new hackathon starting on ${this.startDate} and ending on ${this.endDate}`);
      console.log(`Trying to add ${name} as a new hackathon starting on epoch ${new Date(this.startDate).getTime()}
      and ending on ${this.endDate}`);
    }

    this.adminService.addHackathon(this.hackathon, new Date(this.startDate).getTime(), new Date(this.endDate).getTime())
          .subscribe((resp: {uid: string}) => {
            this.alertsService.success('Successfully added hackathon');
          },         (error) => {
            this.alertsService.warning('Error: Issue with adding hackathon!');
            console.error(error);
          });
  }
}
