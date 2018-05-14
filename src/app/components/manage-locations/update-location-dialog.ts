import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-update-location-dialog',
  templateUrl: './update-location-dialog.html',
  styleUrls: ['./update-location-dialog.css'],
})
export class UpdateLocationDialogComponent {

  constructor(public dialogRef: MatDialogRef<UpdateLocationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
