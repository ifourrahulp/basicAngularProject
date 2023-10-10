import { Component, Inject, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
export interface DialogData {
  message: string;
}


@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss']
})
export class ConfirmPopupComponent implements OnInit {
  constructor( public dialogRef: MatDialogRef<ConfirmPopupComponent>,  @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,) { 
    console.log(dialogData, 'sjsjs');
  }

  ngOnInit(): void {
  }


  addEditRecordPopup(id: number) {}

  deleteRecord(id: number) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
