import { Injectable } from "@angular/core";
import { ContstantSevice } from "./constant";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    
    constructor(private _snackBar: MatSnackBar) {}

    setlocalStroage(value) {
        localStorage.setItem(ContstantSevice.ADDRECORD, JSON.stringify(value));
    }

    getlocalStroage(){
        let getRecord = localStorage.getItem(ContstantSevice.ADDRECORD);
        return getRecord != undefined && getRecord != null ? JSON.parse(getRecord) : getRecord;
    }


    successMessage(message) {
        this._snackBar.open(message, 'X', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5 * 1000,
          panelClass: 'success-snackbar'
        });
      }
}