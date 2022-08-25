import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DB_LINK } from '@constants/db-links.constants';
import { Auth } from '@interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpReceptionsHelperService {
  constructor(private http: HttpClient) {}

  public getReceptions<Reception>(
    link: string,
    body: Auth
  ): Observable<Reception> {
    return this.http.get<Reception>(`${DB_LINK}${link}`, {
      params: {
        accessToken: body.accessToken,
        refreshToken: body.refreshToken,
      },
    });
  }

  public createReceptions<Reception>(
    link: string,
    body: any
  ): Observable<Reception> {
    const { date, patientName, complaints, DoctorId, accessToken } = body;
    return this.http.post<Reception>(
      `${DB_LINK}${link}`,
      {},
      {
        params: {
          patientName: patientName,
          DoctorId: DoctorId,
          date: date,
          complaints: complaints,
          accessToken: accessToken,
        },
      }
    );
  }

  public deleteReception<Reception>(
    link: string,
    body: any
  ): Observable<Reception> {
    const { accessToken, id } = body;
    return this.http.delete<Reception>(`${DB_LINK}${link}`, {
      params: {
        id: id,
        accessToken: accessToken,
      },
    });
  }
}
