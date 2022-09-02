import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

import { Auth } from '@interfaces/user.interface';
import { DB_LINK, UPDATE_TOKENS_LINK } from '@constants/db-links.constants';
import { AuthService } from '@services/auth.service';

@Injectable()
export class RefreshTokensInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  sendRefreshToken(origRequest: HttpRequest<any>) {
    const tokens = this.authService.getTokens();

    const changedRequest = origRequest.clone({
      url: `${DB_LINK}${UPDATE_TOKENS_LINK}`,
      method: 'POST',
      headers: origRequest.headers.set('refreshToken', tokens.refreshtoken),
    });

    return changedRequest;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('User')) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError((resp: HttpErrorResponse) => {
        if (resp.status === 401) {
          return this.authService.refresh().pipe(
            switchMap((event: Auth) => {
              localStorage.setItem('accessToken', event.accessToken);
              localStorage.setItem('refreshToken', event.refreshToken);
              const changedRequest = request.clone({
                headers: request.headers.set('accessToken', event.accessToken),
              });
              return next.handle(changedRequest);
            }),
            catchError((err) => {
              return of(err);
            })
          );
        }
        return throwError(() => new Error('err'));
      })
    );
  }
}
