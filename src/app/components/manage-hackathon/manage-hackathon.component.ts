import { Component, OnInit } from '@angular/core';

import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-manage-hackathon',
  templateUrl: './manage-hackathon.component.html',
  styleUrls: ['./manage-hackathon.component.css']
})
export class ManageHackathonComponent implements OnInit {

  public hackathon: string;

  constructor(
    public alertsService: AlertService,
  ) {
  }

  ngOnInit() {
  }

  addHackathon(name: string) {
    if (name != null) {
      this.alertsService.success('You clicked the button!');
      console.log(name);
    }
  }
}
