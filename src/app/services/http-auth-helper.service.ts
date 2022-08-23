import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DB_LINK } from '@constants/db-links.constants';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthHelperService {
  constructor(private http: HttpClient) {}

  public loginUser<T>(link: string, body: object): Observable<T> {
    return this.http.post<T>(`${DB_LINK}${link}`, body);
  }

  public registerUser<T>(link: string, body: any): Observable<T> {
    return this.http.post<T>(`${DB_LINK}${link}`, body);
  }
}
