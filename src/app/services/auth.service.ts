import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

import {
  CREATE_USER_LINK,
  LOGIN_USER_LINK,
} from '@constants/db-links.constants';

import { Auth, User } from '@interfaces/user.interface';

import { HttpAuthHelperService } from '@services/http-auth-helper.service';
import { SnackbarService } from '@services/notifications/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpAuthService: HttpAuthHelperService,
    private router: Router,
    private snack: SnackbarService
  ) {}

  public getTokens(): any {
    const accesstoken = localStorage.getItem('accessToken');
    const refreshtoken = localStorage.getItem('refreshToken');
    return { accesstoken, refreshtoken };
  }

  public register(body: User): void {
    this.httpAuthService
      .registerUser<Auth>(CREATE_USER_LINK, body)
      .pipe(
        catchError((err) => {
          if (err.status === 0) {
            this.snack.openErrorSnackBar('DB connection error!');
            return of(null);
          }
          this.snack.openErrorSnackBar(err.error);
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
            this.snack.openErrorSnackBar('DB connection error!');
            return of(null);
          }
          this.snack.openErrorSnackBar(err.error.message);
          return of(null);
        })
      )
      .subscribe((result: Auth | null) => {
        if (result) {
          this.snack.openSnackBar(`Welcome, ${result.username}!`);
          localStorage.setItem('accessToken', result.accessToken);
          localStorage.setItem('refreshToken', result.refreshToken);
          this.router.navigate(['/main']);
        }
      });
  }
}
