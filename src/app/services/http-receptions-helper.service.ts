import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DB_LINK } from '@constants/db-links.constants';

@Injectable({
  providedIn: 'root',
})
export class HttpReceptionsHelperService {
  constructor(private http: HttpClient) {}

  public getReceptions<Reception>(link: string): Observable<Reception> {
    return this.http.get<Reception>(`${DB_LINK}${link}`);
  }

  public createReceptions<Reception>(
    link: string,
    body: any
  ): Observable<Reception> {
    const { date, patientName, complaints, doctorId } = body;
    return this.http.post<Reception>(`${DB_LINK}${link}`, {
      date: date,
      patientName: patientName,
      complaints: complaints,
      doctorId: doctorId,
    });
  }

  public deleteReception<Reception>(
    link: string,
    body: any
  ): Observable<Reception> {
    const { id } = body;
    return this.http.delete<Reception>(`${DB_LINK}${link}`, {
      body: { id: id },
    });
  }
}
