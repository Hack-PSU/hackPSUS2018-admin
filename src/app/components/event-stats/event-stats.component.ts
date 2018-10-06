import { Component, OnInit } from '@angular/core';
import { HttpAdminService } from '../../services/http-admin/http-admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatSnackBar,
} from '@angular/material';

@Component({
  selector: 'app-event-stats',
  templateUrl: './event-stats.component.html',
  styleUrls: ['./event-stats.component.css']
})
export class EventStatsComponent implements OnInit {
	event_names = [""];
	event_count = [0];
	event_obj = [];
	 private static tableCols = [
    'eventname', 'eventcount'];

  public displayedColumns = EventStatsComponent.tableCols;
  public dataSource = new MatTableDataSource<any>([]);
  constructor(
  	public adminService: HttpAdminService,
    public activatedRoute: ActivatedRoute
    ) { }
	/*
	* Error array used to display error messages
	*/
  public errors: Error = null;
  ngOnInit() {
    this.activatedRoute.data.subscribe((user) => {
      if (user) {
        this.getEventData();
      } else {
        this.errors = new Error('Error: No user');
        console.error('No User');
      }
    },                                 (error) => {
      this.errors = new Error('Error: Issue with authentication of user');
      console.error(error);
    });
  }

  getEventData() {
  	this.adminService.getEventAttendance().subscribe((data) => {
  		//console.log(data);
  		this.event_count.pop();
  		this.event_names.pop();
  		data.forEach((scan) => {
  			var index = this.event_names.indexOf(scan.event_title)
  			if (index > -1) {
  				this.event_count[index] = this.event_count[index] + 1;
  			} else {
  				this.event_names.push(scan.event_title);
  				this.event_count.push(1);
  			}
  		});
  		for(var i = 0; i < this.event_names.length; i++) {
  			this.event_obj.push({event_name: this.event_names[i], event_count: this.event_count[i]})
  		}
  		console.log(this.event_obj);
  		this.displayedColumns = EventStatsComponent.tableCols;
      	this.dataSource.data = this.event_obj;
  	});
  }
}
