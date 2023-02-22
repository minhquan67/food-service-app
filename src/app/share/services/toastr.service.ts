import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

declare var toastr: any;

@Injectable({
  providedIn: "root",
})
export class ToastrService {
  constructor(private _snackBar: MatSnackBar) { }

  success(message: string, labelAction: string) {
    const matSnackbarConfig: MatSnackBarConfig = {
      duration: 4000,
      panelClass: ['snack-bar-success'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
      data: {
        message: message
      }
    };
    this._snackBar.open(message, labelAction, matSnackbarConfig);
  }
}
