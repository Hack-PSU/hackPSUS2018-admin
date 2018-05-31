/**
 * TODO: Add docstring explaining component
 */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpAdminService } from '../../services/http-admin/http-admin.service';

import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';

import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

import { LocationDialogComponent } from './location-dialog';

@Component({
  selector: 'app-manage-admin',
  providers: [
    HttpAdminService,
  ],
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.css']
})

export class ManageAdminComponent implements OnInit, AfterViewInit {
  private static tableCols = ['location_name', 'uid', 'action_update', 'action_remove'];
  displayedColumns = ManageAdminComponent.tableCols;
  public dataSource = new MatTableDataSource<any>([]);
  private user: firebase.User;

  /*
   * Error array used to display error messages
   */
  public errors: Error = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) table: MatSort;

  constructor(
    public adminService: HttpAdminService,
    public afAuth: AngularFireAuth,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  /**
   * On the initilization of all angular components, execute the functions
   *
   * Retrieves the current user from authentication then calls to update the location table
   *
   * @exception: Failure on the auth service will cause an error to be displayed on the /userdata/ route page
   * @exception: Issue with the user not existing in the auth service database will cause an error to be displayed on the /userdata/ route page
   */
  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.loadTableData();
      } else {
        this.errors = new Error("Error: No user")
        console.error('No User');
      }
    }, (error) => {
        this.errors = new Error("Error: Issue with authentication of user")
        console.error(error);
    });
  }

  /**
   * After the initilization of all angular components, set the variables
   *
   * After the component view has been initialized, set the local data source paginiator property
   * to the new instance of pagninator. Similar effect with sort.
   *
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.table;
  }

  /**
   * Modify the data source to only have the filtered results
   *
   * Convert the filter value (string) to lowercase and remove any additional spacing. Then
   * set the filter property of the local datasource to the new filter value.
   *
   * @param: filterValue  String to filter the datasource
   */
  applyFilter(filterValue: string) {
    let mFilterValue = filterValue.trim();
    mFilterValue = mFilterValue.toLowerCase();
    this.dataSource.filter = mFilterValue;
  }

  /**
   * Retrieve and load the location data into the datasource
   *
   * Call the admin service request to retrieve the location data. Then set the columns names to
   * the entries defined in tableCols and the datasource data to the request response data.
   *
   * @exception: Failure with the admin service with cause an error to be displayed on the /userdata/ route page
   */
  loadTableData() {
    this.adminService.getLocations(this.user).subscribe((data) => {
      this.displayedColumns = ManageAdminComponent.tableCols;
      this.dataSource.data = data;
    },                                                  (error) => {
      console.error(error);
    });
  }

  /**
   * Abstraction for refreshing the data in a table, executes the loadTableData function
   */
  refreshData() {
    this.loadTableData();
  }

  /**
   * Opens a modal for displaying more single user information, located in ViewUserDataDialog.ts
   *
   * @param: user  single user data
   */
  openLocationEditDialog(actionType: string, locationName: string, locationUID: string) {
    var temp = {};
    temp['action_name'] = actionType;
    temp['current_location_name'] = locationName;
    console.log('DB:' + actionType + ' ' + locationName + ' ' + locationUID);

    var windowHeight = '300px';

    switch(actionType) {
      case 'Update': windowHeight = '300px'; break;
      case 'Remove': windowHeight = '200px'; break;
      case 'Add': windowHeight = '250px'; break;
    }

    const dialogRef = this.dialog.open(LocationDialogComponent, {
      height: windowHeight,
      data: temp,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if(result.slice(0,6) === 'Update') {
          console.log(result.slice(0,6));
          var newLocationName = result.slice(6);
          console.log(newLocationName);
          this.updateLocation(newLocationName, locationUID);
        } else if(result.slice(0,6) === 'Remove') {
          console.log(result.slice(0,6));
          console.log(result.slice(6));
          this.removeLocation(locationUID);
        } else if(result.slice(0,3) === 'Add') {
          var newLocationName = result.slice(3);
          console.log(newLocationName);
          this.insertLocation(newLocationName);

        }
      } else {
        this.errors = new Error("Error Processing Action.")
        console.error('Error Processing Action');
      }
    });
  }
  
  updateLocation(locationValue: string, uid: string) {
    const mLocationValue = locationValue.trim();
    this.adminService.updateLocation(this.user, uid, mLocationValue).subscribe((resp) => {
      this.refreshData();
      this.openSnackBar('Success: Updated location', '');
    },                                                                         (error) => {
      console.error(error);
      this.openSnackBar('Error: Failed to update location', '');
    });
  }

  insertLocation(locationValue: string) {
    const mLocationValue = locationValue.trim();
    // console.log(mLocationValue);
    this.adminService.addNewLocation(this.user, mLocationValue).subscribe((resp) => {
      this.refreshData();
      this.openSnackBar('Success: Inserted new location', '');
    },                                                                    (error) => {
      console.error(error);
      this.openSnackBar('Error: Failed to insert location', '');
    });
  }

  removeLocation(uid: string) {
    console.log(uid);
    this.adminService.removeLocation(this.user, uid).subscribe((resp) => {
      this.refreshData();
      this.openSnackBar('Success: Removed location', '');
    },                                                         (error) => {
      console.error(error);
      this.openSnackBar('Error: Failed to remove location', '');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}


