import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpAdminService } from '../http-admin.service';

import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';

import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { AppConstants } from '../AppConstants';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-extra-credit-classes',
  providers: [
    HttpAdminService,
  ],
  templateUrl: './extra-credit-classes.component.html',
  styleUrls: ['./extra-credit-classes.component.css']
})
export class ExtraCreditClassesComponent implements OnInit, AfterViewInit {
  private static regCols = ['select', 'class_name', 'uid'];
  displayedColumns = ExtraCreditClassesComponent.regCols;
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
    public snackBar: MatSnackBar ) {
  }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.onClassesClick();
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

  onClassesClick() {
    this.adminService.getExtraCreditClasses(this.user).subscribe((data) => {
      this.displayedColumns = ExtraCreditClassesComponent.regCols;
      this.dataSource.data = data;
    },                                                      (error) => {
      console.error(error);
    });
  }

  insertLocation(locationValue: string) {
  	let mLocationValue = locationValue.trim();
  	console.log(mLocationValue);
    this.adminService.addNewLocation(this.user, mLocationValue).subscribe((resp) => {
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
    this.onClassesClick();
  }

  addUserToClasses() {
    let dialogRef = this.dialog.open(AddUserClassDialogComponent, {
      height: '240px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        this.adminService.getUserUID(this.user, result).subscribe((resp) => {
          console.log(resp);
          console.log(this.selection.selected.length);
          for(let i = 0; i < this.selection.selected.length; i++) {
            this.adminService.addUserToExtraClass(this.user, resp.uid, this.selection.selected[i].uid).subscribe((rest) => {
              this.openSnackBar("Success: Added User", "");
            },                                                      (error) => {
              console.error(error);
              this.openSnackBar("Error: Failed to Add User", "");
            });
          }
        },                                                      (error) => {
          console.error(error);
          this.openSnackBar("Error: Issue with provided Email", "");
        });
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

@Component({
  selector: 'app-add-user-class-dialog',
  templateUrl: './add-user-class-dialog.html',
  styleUrls: ['./add-user-class-dialog.css'],
})
export class AddUserClassDialogComponent {

  constructor( public dialogRef: MatDialogRef<AddUserClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
