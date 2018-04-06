import { Component, Inject, OnInit } from '@angular/core';
import { EventModel } from '../event-model';
import { EventsService } from '../events.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource } from '@angular/material';
import * as uuid from 'uuid/v4';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AppConstants } from '../AppConstants';
import { ManageLocationsComponent } from '../manage-locations/manage-locations.component';

@Component({
  selector: 'app-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.css'],
  providers: [
    EventsService,
    MatSnackBar,
  ],
})
export class ManageEventsComponent implements OnInit {
  private static regCols = ['location_name', 'uid', 'event_start_time', 'event_end_time', 'event_title', 'event_description', 'event_type', 'button'];
  displayedColumns = ManageEventsComponent.regCols;
  newEvent: EventModel;
  public dataSource = new MatTableDataSource<EventModel>([]);
  private idtoken: Observable<string>;


  constructor(private eventsService: EventsService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              private afAuth: AngularFireAuth,
              private _router: Router,
    ) {
    this.newEvent = new EventModel();
  }

  ngOnInit() {
    this.eventsService.subject(new Event('connected'))
      .subscribe(() => {
        this.dataSource.data = [];
      });
    this.eventsService.subject(new Event('disconnected'))
      .subscribe(() => {
        this.dataSource.data = [];
      });
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.idtoken = Observable.fromPromise(user.getIdToken(true));
        this.idtoken.subscribe((value) => {
          this.eventsService.getEvents(value).subscribe((events: EventModel[]) => {
            this.dataSource.data = this.dataSource.data.concat(events);
          });
        },                     (error) => {
          this.snackBar.open(error.body, null, {
            duration: 2000,
          });
        });
      } else {
        this._router.navigate([AppConstants.LOGIN_ENDPOINT]);
      }
    });
  }

  addLocation() {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '350px',
      data: Object.keys(this.newEvent),
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        result.uid = uuid();
        result.event_start_time = new Date(result.event_start_time).getTime().toString();
        result.event_end_time = new Date(result.event_end_time).getTime().toString();
        this.eventsService.addEvent(result)
          .subscribe((value) => {
            this.snackBar.open('success', null, {
              duration: 2000,
            });
          },         (error) => {
            this.snackBar.open(error.body, null, {
              duration: 2000,
            });
          });
      }
    });
  }

  getTimeString(time: string) {
    return new Date(parseInt(time, 10)).toLocaleTimeString();
  }
}

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.html',
  styleUrls: ['./add-event-dialog.css'],
})
export class AddEventDialogComponent {

  public outData: any;

  constructor(public dialogRef: MatDialogRef<AddEventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.outData = {};
    data.forEach(d => this.outData[d] = '');
  }
}
