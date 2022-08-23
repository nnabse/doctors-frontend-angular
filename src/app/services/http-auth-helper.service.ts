import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DB_LINK } from '@constants/db-links.constants';
import { User } from '@interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthHelperService {
  constructor(private http: HttpClient) {}

  public loginUser<Auth>(link: string, body: User): Observable<Auth> {
    return this.http.post<Auth>(`${DB_LINK}${link}`, body);
  }

  public registerUser<Auth>(link: string, body: User): Observable<Auth> {
    return this.http.post<Auth>(`${DB_LINK}${link}`, body);
  }
}
