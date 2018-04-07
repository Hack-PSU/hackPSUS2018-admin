import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpAdminService } from '../http-admin.service';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';

import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { AppConstants } from '../AppConstants';
//import { EmailListService } from '../email-list.service';

@Component({
  selector: 'app-manage-locations',
  providers: [
    HttpAdminService,
  ],
  templateUrl: './manage-locations.component.html',
  styleUrls: ['./manage-locations.component.css']
})

export class ManageLocationsComponent implements OnInit, AfterViewInit {
  private static regCols = ['select', 'location_name', 'uid', 'button',];
  displayedColumns = ManageLocationsComponent.regCols;
  public dataSource = new MatTableDataSource<any>([]);
  private user: firebase.User;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) table: MatSort;

  constructor(
    public adminService: HttpAdminService,
    public afAuth: AngularFireAuth,
    private router: Router) {
  }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.onLocationClick();
      } else {
        console.error('NO USER');
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.table;
  }

  applyFilter(filterValue: string) {
    let mFilterValue = filterValue.trim();
    mFilterValue = mFilterValue.toLowerCase();
    this.dataSource.filter = mFilterValue;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onLocationClick() {
    this.adminService.getLocations(this.user).subscribe((data) => {
      this.displayedColumns = ManageLocationsComponent.regCols;
      this.dataSource.data = data;
    },                                                      (error) => {
      console.error(error);
    });
  }

  insertLocation(locationValue: string) {
  	let mLocationValue = locationValue.trim();
  	console.log(mLocationValue);
    this.adminService.addNewLocation(this.user, mLocationValue).subscribe((resp) => {
      console.log(resp);
      this.refreshData();
    },                                                      (error) => {
      console.error(error);
    });
  }

  removeLocation(uid: string ) {
  	console.log(uid);
    this.adminService.removeLocation(this.user, uid).subscribe((resp) => {
      console.log(resp);
      this.refreshData();
    },                                                      (error) => {
      console.error(error);
    });
  }

  refreshData() {
    this.onLocationClick();
  }
}

