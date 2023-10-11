import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmPopupComponent } from '../common/confirm-popup/confirm-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { CONFIRM } from 'src/app/common/_enum/confirm.enum';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AddEditRecordComponent } from '../add-edit-record/add-edit-record.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
export interface RecordElement {
  firstName?: string;
  lastName?: string;
  id?: number;
  startDate?: string;
  endDate?: string;
  uploadImage?: string;
}

const ELEMENT_DATA: [] = [
  // {id: 1, firstName: 'Hydrogen', lastName: 'Hydrogen', startDate: '11-09-2023', endDate: '11-09-2023', uploadImage: ''},
  // {id: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  // {id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  // {id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  // {id: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  // {id: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  // {id: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {id: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {id: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {id: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'startDate', 'endDate','uploadImage','id'];
  emptyColumns: string[] = ['empty-row'];
  dataSource = new MatTableDataSource<RecordElement>(ELEMENT_DATA);
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  emptyData = new MatTableDataSource([{ empty: 'row' }]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog, 
    private cd: ChangeDetectorRef, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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
    this.openSnackBar();
    this.cd.detectChanges();    
  }

  openSnackBar() {
    this._snackBar.open('Delete Record successfully.', 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,
      panelClass: 'success-snackbar'
    });
  }

  addEditRecord(id: number = 0) {
    const dialogRef = this.dialog.open(AddEditRecordComponent, {
      data: {id: id},
      panelClass:'icon-outside',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == CONFIRM.YES) {
        this.removeElementArray(id); 
      }
    });
  }
}
