import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2500,
      panelClass: ['success-snackbar'],
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }

  openErrorSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3500,
      panelClass: ['error-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
