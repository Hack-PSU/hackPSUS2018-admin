import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpAdminService } from '../../services/http-admin/http-admin.service';

import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';

import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-manage-locations',
  providers: [
    HttpAdminService,
  ],
  templateUrl: './manage-locations.component.html',
  styleUrls: ['./manage-locations.component.css'],
})

export class ManageLocationsComponent implements OnInit, AfterViewInit {
  private static regCols = [/*'select',*/ 'location_name', 'uid', 'button'];
  displayedColumns = ManageLocationsComponent.regCols;
  public dataSource = new MatTableDataSource<any>([]);
  private user: firebase.User;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) table: MatSort;

  constructor(
    public adminService: HttpAdminService,
    public afAuth: AngularFireAuth,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar, ) {
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

  showInsertDialog() {
    let dialogRef = this.dialog.open(AddLocationDialogComponent, {
      height: '240px',
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      this.insertLocation(result);
    },                                                      (error) => {
      this.openSnackBar("Error: Failed to record location", "");
    });
  }

  insertLocation(locationValue: string) {
  	let mLocationValue = locationValue.trim();
  	//console.log(mLocationValue);
    this.adminService.addNewLocation(this.user, mLocationValue).subscribe((resp) => {
      this.refreshData();
      this.openSnackBar("Success: Inserted new location", "");
    },                                                      (error) => {
      console.error(error);
      this.openSnackBar("Error: Failed to insert location", "");
    });
  }

  removeLocation(uid: string ) {
  	//console.log(uid);
    this.adminService.removeLocation(this.user, uid).subscribe((resp) => {
      this.refreshData();
      this.openSnackBar("Success: Removed location", "");
    },                                                      (error) => {
      console.error(error);
      this.openSnackBar("Error: Failed to remove location", "");
    });
  }

  showUpdateDialog(uid: string) {
    let dialogRef = this.dialog.open(UpdateLocationDialogComponent, {
      height: '240px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.updateLocation(result, uid);
      }
    },                                                      (error) => {
      this.openSnackBar("Error: Failed to record location", "");
    });
  }

  updateLocation(locationValue: string, uid: string) {
    let mLocationValue = locationValue.trim();
    console.log(mLocationValue);
    this.adminService.updateLocation(this.user, uid, mLocationValue).subscribe((resp) => {
      this.refreshData();
      this.openSnackBar("Success: Updated location", "");
    },                                                      (error) => {
      console.error(error);
      this.openSnackBar("Error: Failed to update location", "");
    });
  }

  refreshData() {
    this.onLocationClick();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

@Component({
  selector: 'app-add-location-dialog',
  templateUrl: './add-location-dialog.html',
  styleUrls: ['./add-location-dialog.css'],
})
export class AddLocationDialogComponent {

  constructor( public dialogRef: MatDialogRef<AddLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-update-location-dialog',
  templateUrl: './update-location-dialog.html',
  styleUrls: ['./update-location-dialog.css'],
})
export class UpdateLocationDialogComponent {

  constructor( public dialogRef: MatDialogRef<UpdateLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

