import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfirmPopupComponent } from '../common/confirm-popup/confirm-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { CONFIRM } from 'src/app/common/_enum/confirm.enum';
export interface PeriodicElement {
  name: string;
  id: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
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
  displayedColumns: string[] = ['name', 'weight', 'symbol','id'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog, 
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
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
    let elements = this.dataSource.filter(x => x.id != id);
    this.dataSource = elements;
    this.cd.detectChanges();    
  }
}
