import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '@services/auth.service';
import { UPDATE_TOKENS_LINK } from '@constants/db-links.constants';

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokens = this.authService.getTokens();

    if (req.url.includes('User') || req.url.includes(UPDATE_TOKENS_LINK)) {
      return next.handle(req);
    }

    const cloneReq = req.clone({
      headers: req.headers.set('accesstoken', tokens.accesstoken),
    });
    return next.handle(cloneReq);
  }
}
