import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DB_LINK, RECEPTIONS_LINK } from '@constants/db-links.constants';

import { Reception } from '@interfaces/reception.interface';
import { Filtering, Sorting } from '@interfaces/sorting.interface';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReceptionsService {
  public receptionsList$: BehaviorSubject<Reception[]> = new BehaviorSubject<
    Reception[]
  >([]);

  constructor(private http: HttpClient) {}

  public getReceptionsList(
    sorting?: Sorting,
    filtering?: Filtering
  ): Observable<Reception[]> {
    const params = {
      sortOption: '',
      sortMethod: '',
      startDate: '',
      endDate: '',
    };

    if (sorting?.sortOption && sorting?.sortMethod) {
      params.sortOption = sorting.sortOption;
      params.sortMethod = sorting.sortMethod;
    }
    if (filtering?.startDate && filtering?.endDate) {
      params.startDate = filtering.startDate;
      params.endDate = filtering.endDate;
    }

    return this.http.get<Reception[]>(`${DB_LINK}${RECEPTIONS_LINK}`, {
      params: params,
    });
  }

  public createReception(body: Reception): Observable<Reception> {
    return this.http.post<Reception>(`${DB_LINK}${RECEPTIONS_LINK}`, body);
  }

  public deleteReception(receptionId: number): Observable<Reception> {
    return this.http.delete<Reception>(`${DB_LINK}${RECEPTIONS_LINK}`, {
      params: { id: receptionId },
    });
  }

  public renameReception(
    receptionId: number,
    body: Reception
  ): Observable<Reception> {
    return this.http.patch<Reception>(`${DB_LINK}${RECEPTIONS_LINK}`, body, {
      params: { id: receptionId },
    });
  }
}
