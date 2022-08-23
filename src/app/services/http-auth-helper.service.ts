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

  public loginUser<T>(link: string, body: User): Observable<T> {
    return this.http.post<T>(`${DB_LINK}${link}`, body);
  }

  public registerUser<T>(link: string, body: User): Observable<T> {
    return this.http.post<T>(`${DB_LINK}${link}`, body);
  }
}
