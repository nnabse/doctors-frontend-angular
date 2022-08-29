import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';

import { Doctor } from '@interfaces/doctors.interface';

import { DB_LINK, DOCTORS_LINK } from '@constants/db-links.constants';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  public doctorsList$: BehaviorSubject<Doctor[]> = new BehaviorSubject<
    Doctor[]
  >([]);

  constructor(private http: HttpClient) {}

  public getDoctorList(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${DB_LINK}${DOCTORS_LINK}`);
  }
}
