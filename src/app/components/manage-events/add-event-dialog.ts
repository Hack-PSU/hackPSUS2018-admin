import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

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
