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
  public endDate: string; // convert to epoch time

  constructor(
    public alertsService: AlertService,
  ) {
  }

  ngOnInit() {
  }

  addHackathon(name: string) {
    if (name != null) {
      this.alertsService.success(`Adding ${name} as a new hackathon starting on ${this.startDate} and ending on ${this.endDate}`);
      console.log(`Trying to add ${name} as a new hackathon starting on ${this.startDate} and ending on ${this.endDate}`);
    }
  }
}
