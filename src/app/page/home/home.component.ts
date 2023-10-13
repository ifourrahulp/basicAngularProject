import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmPopupComponent } from '../common/confirm-popup/confirm-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { CONFIRM } from 'src/app/common/_enum/confirm.enum';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AddEditRecordComponent } from '../add-edit-record/add-edit-record.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonService } from 'src/app/common/_service/common.service';
export interface RecordElement {
  firstName?: string;
  lastName?: string;
  id?: number;
  startDate?: string;
  endDate?: string;
  uploadImage?: string;
}

const ELEMENT_DATA: RecordElement[] = [];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'startDate', 'endDate','uploadImage','id'];
  dataSource = new MatTableDataSource<RecordElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog, 
    private cd: ChangeDetectorRef, 
    private _snackBar: MatSnackBar, 
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.getRecords();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addEditRecordPopup(id: number) {}

  deleteRecord(id: number) {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      data: {message: 'Are you sure want to delete?'},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      if(result == CONFIRM.YES) {
        this.removeElementArray(id); 
      }
    });
  }

  removeElementArray(id: number) {
    let elements = this.dataSource?.data?.filter(x => x.id != id);
    this.dataSource.data = elements;
    this.commonService.successMessage('Record deleted successfully.');
    this.cd.detectChanges();    
  }

 

  addEditRecord(id: number = 0) {
    const dialogRef = this.dialog.open(AddEditRecordComponent, {
      data: {id: id},
      panelClass:'icon-outside',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getRecords();
    });

    
  }

  getRecords() {
    let records = this.commonService.getlocalStroage();
    if(records != undefined && records != null) {
      this.dataSource = new MatTableDataSource<RecordElement>(records);
      this.cd.detectChanges();  
    }
  }
  
}
