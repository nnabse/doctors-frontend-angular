import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DB_LINK } from '@constants/db-links.constants';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpDoctorsHelperService {
  constructor(private http: HttpClient) {}

  public getDoctors<Doctor>(link: string, body: any): Observable<Doctor> {
    return this.http.get<Doctor>(`${DB_LINK}${link}`, {
      params: {
        accessToken: body.accessToken,
        refreshToken: body.refreshToken,
      },
    });
  }
}
