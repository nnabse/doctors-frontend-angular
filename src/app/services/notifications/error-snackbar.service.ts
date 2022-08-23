import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class ErrorSnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3500,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
