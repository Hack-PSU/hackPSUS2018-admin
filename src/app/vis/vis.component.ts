import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { HttpAdminService } from '../http-admin.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegistrationTableComponent } from '../registration-table/registration-table.component';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-vis',
  templateUrl: './vis.component.html',
  styleUrls: ['./vis.component.css'],
})
export class VisComponent implements OnInit {

  private user: firebase.User;
  public chart: any;
  private lineChartType: string;

  public lineChartData: [];

  constructor(public adminService: HttpAdminService, public afAuth: AngularFireAuth) {
      this.chart.data = {};
      this.chart.options = {};
    }

  ngOnInit() {


      this.afAuth.auth.onAuthStateChanged((user) => {
          if (user) {
              this.user = user;
              this.adminService.getRegistrations(this.user)
                    .subscribe((data: any[]) => {
                      console.log(data);
                        /* [
                {
                    "name": "facebook",
                    "value": 3/17/2018
                },
                {
                    "name": "friends",
                    "value": 3/02/2018
                },
                {
                    "name": "MLH",
                    "value": 3/01/2018
                }
            ];*/
                      this.lineChartData = [
                          {
                            name: 'MLH',
                            series: data.reduce((accumulator, currentValue) => {
                                  let date = new Date(currentValue.sign_up_time);
                                  if (accumulator[date.getDay().toString() + date.getMonth().toString() + date.getYear().toString()]) {
                                      if (currentValue.referral.match(/mlh/i)) {
                                          accumulator[date.getDay().toString() + date.getMonth().toString() + date.getYear().toString()].value += 1
                                        }
                                    } else {
                                      accumulator[date.getDay().toString() + date.getMonth().toString() + date.getYear().toString()].value = 1;
                                      accumulator[date.getDay().toString() + date.getMonth().toString() + date.getYear().toString()].name = 'date.getDay().toString()+date.getMonth().toString()+date.getYear().toString()'
                                    }
                                }), // return an object in the form of the dates
                          },

                          {
                            name: 'facebook',
                            series: data.reduce((accumulator, currentValue) => {
                                  let date = new Date(currentValue.sign_up_time);
                                  if (accumulator[date.getDay().toString() + date.getMonth().toString() + date.getYear().toString()]) {
                                      if (currentValue.referral.match(/facebook|fb/i)) {
                                          accumulator[date.getDay().toString() + date.getMonth().toString() + date.getYear().toString()].value += 1
                                        }
                                    } else {
                                      accumulator[date.getDay().toString() + date.getMonth().toString() + date.getYear().toString()].value = 1;
                                      accumulator[date.getDay().toString() + date.getMonth().toString() + date.getYear().toString()].name = 'date.getDay().toString()+date.getMonth().toString()+date.getYear().toString()'
                                    }
                                }),
                          },

                          {
                            name: 'friends',
                            series: data.reduce((accumulator, currentValue) => {
                                  let date = new Date(currentValue.sign_up_time);
                                  if (accumulator[date.getDay().toString() + date.getMonth().toString() + date.getYear().toString()]) {
                                      if (currentValue.referral.match(/friends|friend/i)) {
                                          accumulator[date.getDay().toString() + date.getMonth().toString() + date.getYear().toString()].value += 1
                                        }
                                    } else {
                                      accumulator[date.getDay().toString() + date.getMonth().toString() + date.getYear().toString()].value = 1;
                                      accumulator[date.getDay().toString() + date.getMonth().toString() + date.getYear().toString()].name = 'date.getDay().toString()+date.getMonth().toString()+date.getYear().toString()'
                                    }
                                }),
                          }];
                    //
                    //     //get timestamp from firebase
                    //     this.lineChartLabel
                    // :
                    //     Array < any > = firebase.User.TimeInterval;
                    //     //just something they do, i'm not sure why
                    //     this.lineChartOptions
                    // :
                    //     any = {
                    //         responsive: true
                    //     };
                    //     //coloring for background and lines
                    //     this.lineChartColors
                    // :
                    //     Array < any > = [
                    //         { // grey
                    //             backgroundColor: 'rgba(148,159,177,0.2)',
                    //             borderColor: 'rgba(148,159,177,1)',
                    //             pointBackgroundColor: 'rgba(148,159,177,1)',
                    //             pointBorderColor: '#fff',
                    //         },
                    //         { // dark grey
                    //             backgroundColor: 'rgba(77,83,96,0.2)',
                    //             borderColor: 'rgba(77,83,96,1)',
                    //             pointBackgroundColor: 'rgba(77,83,96,1)',
                    //             pointBorderColor: '#fff',
                    //         },
                    //         { // grey
                    //             backgroundColor: 'rgba(148,159,177,0.2)',
                    //             borderColor: 'rgba(148,159,177,1)',
                    //             pointBackgroundColor: 'rgba(148,159,177,1)',
                    //             pointBorderColor: '#fff',
                    //         }
                    //     ];
                    //     //I think this is just testing if it's running
                    //     this.lineChartLegend
                    // :
                    //     boolean = true;


                        // })
            }; else {
              console.error('NO USER');
            }
        },
        );

      function type(d, _, columns) {
            // d.date = parseTime(d.date);
          for (let i = 1, n = columns.length, c; i < n; ++i) {
              d[c = columns[i]] = +d[c];
            }
          return d;
        }
    }

}
