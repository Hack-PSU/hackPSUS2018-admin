import { Component, Inject, OnInit } from '@angular/core';
import { EmailListService } from '../email-list.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  providers: [],
  styleUrls: ['./send-email.component.css'],
})
export class SendEmailComponent implements OnInit {
  secondFormGroup: FormGroup;
  keys = [];
  emailBody = '';

  constructor(public emailListService: EmailListService, public dialog: MatDialog, private _formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.keys = Object.keys(this.emailListService.emailList[0] ? this.emailListService.emailList[0] : { email: '' });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  deleteSelected(emailsDOMRef: any) {
    console.log(emailsDOMRef);
    const removalIndices = emailsDOMRef.selectedOptions.selected.map((location) => {
      return emailsDOMRef.options._results.findIndex(index => index === location);
    });
    this.emailListService.emailList = this.emailListService.emailList.filter((v, i) => removalIndices.indexOf(i) === -1);
  }

  addNew() {
    const dialogRef = this.dialog.open(AddEmailDialogComponent, {
      width: '300px',
      data: this.keys,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.emailListService.emailList.push(result)
      }
    });
  }

  addPlaceholder(id: any) {
    this.emailBody = this.emailBody.concat('$').concat(id).concat('$');
    if (id === 'forgot_url') {
      this.emailListService.emailList.forEach((object) => {
        object.forgot_url = 'https://app.hackpsu.org/forgot/?email='.concat(object.email);
      })
    }
  }
}

@Component({
  selector: 'app-add-email-dialog',
  templateUrl: './add-email-dialog.html',
  styleUrls: [],
})
export class AddEmailDialogComponent {

  public outData: any;

  constructor(
    public dialogRef: MatDialogRef<AddEmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.outData = {};
    data.forEach(d => this.outData[d] = '');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
