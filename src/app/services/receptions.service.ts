import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DB_LINK, RECEPTIONS_LINK } from '@constants/db-links.constants';

import { Reception } from '@interfaces/reception.interface';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReceptionsService {
  public receptionsList$: BehaviorSubject<Reception[]> = new BehaviorSubject<
    Reception[]
  >([]);

  constructor(private http: HttpClient) {}

  public getReceptionsList(): Observable<Reception[]> {
    return this.http.get<Reception[]>(`${DB_LINK}${RECEPTIONS_LINK}`);
  }

  public createReception(body: any): Observable<Reception> {
    const { date, patientName, complaints, doctorId } = body;
    return this.http.post<Reception>(`${DB_LINK}${RECEPTIONS_LINK}`, {
      date: date,
      patientName: patientName,
      complaints: complaints,
      doctorId: doctorId,
    });
  }

  public deleteReception(body: any): Observable<Reception> {
    const { id } = body;
    return this.http.delete<Reception>(`${DB_LINK}${RECEPTIONS_LINK}`, {
      body: { id: id },
    });
  }
}
