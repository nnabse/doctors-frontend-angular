import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';

import { DOCTORS_LINK } from '@constants/db-links.constants';

import { Doctor } from '@interfaces/doctors.interface';

import { HttpDoctorsHelperService } from '@services/http-doctors-helper.service';
import { SnackbarService } from '@services/notifications/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  public doctorsList$: BehaviorSubject<Doctor[]> = new BehaviorSubject<
    Doctor[]
  >([]);

  constructor(
    private httpDoctorsHelper: HttpDoctorsHelperService,
    private snack: SnackbarService
  ) {}

  public getDoctorsList(): void {
    this.httpDoctorsHelper
      .getDoctors<Doctor[]>(DOCTORS_LINK)
      .pipe(
        catchError((err) => {
          if (err.status === 0) {
            this.snack.openErrorSnackBar('DB connection error!');
            return of(null);
          }
          this.snack.openErrorSnackBar(err.error);
          return of(null);
        })
      )
      .subscribe((result: Doctor[] | null) => {
        if (result) {
          this.doctorsList$.next(result);
        }
      });
  }
}
