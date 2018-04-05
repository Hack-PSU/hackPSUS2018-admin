import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpAdminService } from '../http-admin.service';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';

import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { AppConstants } from '../AppConstants';

@Component({
  selector: 'app-manage-rsvp',
  providers: [
    HttpAdminService,
  ],
  templateUrl: './manage-rsvp.component.html',
  styleUrls: ['./manage-rsvp.component.css']
})


export class ManageRsvpComponent implements OnInit, AfterViewInit {
  private static regCols = [/*'select',*/ 'firstname', 'lastname', 'email','pin', 'uid', 'rsvp_time'];
  displayedColumns = ManageRsvpComponent.regCols;
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
        this.onRSVPClick();
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

  onRSVPClick() {
    this.adminService.getRSVP(this.user).subscribe((data) => {
      this.displayedColumns = ManageRsvpComponent.regCols;
      this.dataSource.data = data;
    },                                                      (error) => {
      console.error(error);
    });
  }

  refreshData() {
    this.onRSVPClick();
  }

  getDateString(time: string) {
    return new Date(parseInt(time, 10)).toLocaleString()
  }

  convertFromBaseToBase(str, fromBase, toBase) {
    var num = parseInt(str, fromBase); //convert from one base to another
    return num.toString(toBase);
  }
}