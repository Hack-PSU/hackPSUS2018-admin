import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpAdminService } from '../http-admin.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-pre-registration-table',
  templateUrl: './pre-registration-table.component.html',
  providers: [
    HttpAdminService,
    AngularFireAuth,
  ],
  styleUrls: ['./pre-registration-table.component.css'],
})
export class PreRegistrationTableComponent implements OnInit, AfterViewInit {
  private static preRegCols = ['email', 'uid'];
  displayedColumns = PreRegistrationTableComponent.preRegCols;
  public dataSource = new MatTableDataSource<any>([]);
  private user: firebase.User;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) table: MatSort;


  constructor(public adminService: HttpAdminService, public afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.onPreRegistrationClick();
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
    mFilterValue = filterValue.toLowerCase();
    this.dataSource.filter = mFilterValue;
  }


  onPreRegistrationClick() {
    this.displayedColumns = [];
    this.dataSource.data = [];
    this.adminService.getPreRegistrations(this.user).subscribe((data) => {
      console.log(data);
      this.displayedColumns = PreRegistrationTableComponent.preRegCols;
      this.dataSource.data = data;
    },                                                         (error) => {
      console.error(error);
    });
  }

}
