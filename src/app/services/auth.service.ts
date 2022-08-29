import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  CREATE_USER_LINK,
  DB_LINK,
  LOGIN_USER_LINK,
} from '@constants/db-links.constants';

import { Auth, User } from '@interfaces/user.interface';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public getTokens(): any {
    const accesstoken = localStorage.getItem('accessToken');
    const refreshtoken = localStorage.getItem('refreshToken');
    return { accesstoken, refreshtoken };
  }

  public register(body: User): Observable<Auth> {
    return this.http.post<Auth>(`${DB_LINK}${CREATE_USER_LINK}`, body);
  }

  public login(body: User): Observable<Auth> {
    return this.http.post<Auth>(`${DB_LINK}${LOGIN_USER_LINK}`, body);
  }
}
