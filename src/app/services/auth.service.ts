import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpAuthHelperService } from './http-auth-helper.service';

import { SnackbarService } from './notifications/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpAuthService: HttpAuthHelperService,
    private router: Router,
    private snackService: SnackbarService
  ) {}

  login(body: any): void {
    this.httpAuthService
      .loginUser(body)
      .pipe(
        catchError(async (err) => this.snackService.openSnackBar(err.error))
      )
      .subscribe((result) => {
        if (result) {
          this.snackService.openSnackBar('Success login!');
          localStorage.setItem('accessToken', result.accessToken);
          localStorage.setItem('refreshToken', result.refreshToken);
          this.router.navigate(['/main']);
        }
      });
  }

  register(body: any): void {
    this.httpAuthService
      .registerUser(body)
      .pipe(
        catchError(async (err) => this.snackService.openSnackBar(err.error))
      )
      .subscribe((result) => {
        if (result) {
          this.snackService.openSnackBar('Success registration!');
          localStorage.setItem('accessToken', result.accessToken);
          localStorage.setItem('refreshToken', result.refreshToken);
          this.router.navigate(['/main']);
        }
      });
  }
}
