import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

import {
  CREATE_USER_LINK,
  LOGIN_USER_LINK,
} from '@constants/db-links.constants';

import { Auth, User } from '@interfaces/user.interface';

import { HttpAuthHelperService } from '@services/http-auth-helper.service';
import { ErrorSnackbarService } from '@services/notifications/error-snackbar.service';
import { SnackbarService } from '@services/notifications/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpAuthService: HttpAuthHelperService,
    private router: Router,
    private snack: SnackbarService,
    private errorSnack: ErrorSnackbarService
  ) {}

  public register(body: User): void {
    this.httpAuthService
      .registerUser<Auth>(CREATE_USER_LINK, body)
      .pipe(
        catchError((err) => {
          if (err.status === 0) {
            this.errorSnack.openSnackBar('DB connection error!');
            return of(null);
          }
          this.errorSnack.openSnackBar(err.error);
          return of(null);
        })
      )
      .subscribe((result: Auth | null) => {
        if (result) {
          this.snack.openSnackBar('Success registration!');
          localStorage.setItem('accessToken', result.accessToken);
          localStorage.setItem('refreshToken', result.refreshToken);
          this.router.navigate(['/main']);
        }
      });
  }

  public login(body: User): void {
    this.httpAuthService
      .loginUser<Auth>(LOGIN_USER_LINK, body)
      .pipe(
        catchError((err) => {
          if (err.status === 0) {
            this.errorSnack.openSnackBar('DB connection error!');
            return of(null);
          }
          this.errorSnack.openSnackBar(err.error);
          return of(null);
        })
      )
      .subscribe((result: Auth | null) => {
        if (result) {
          this.snack.openSnackBar('Success login!');
          localStorage.setItem('accessToken', result.accessToken);
          localStorage.setItem('refreshToken', result.refreshToken);
          this.router.navigate(['/main']);
        }
      });
  }
}
