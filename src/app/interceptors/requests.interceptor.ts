import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '@services/auth.service';

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const Tokens = this.authService.getTokens();

    if (req.url.includes('User')) {
      return next.handle(req);
    }

    const cloneReq = req.clone({
      headers: req.headers.set('accesstoken', Tokens.accesstoken),
    });
    return next.handle(cloneReq);
  }
}
