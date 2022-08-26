import { Injectable } from '@angular/core';

import { RECEPTIONS_LINK } from '@constants/db-links.constants';

import { Reception } from '@interfaces/reception.interface';

import { BehaviorSubject, catchError, of } from 'rxjs';
import { DoctorsService } from './doctors.service';

import { HttpReceptionsHelperService } from './http-receptions-helper.service';
import { SnackbarService } from './notifications/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class ReceptionsService {
  public receptionsList$: BehaviorSubject<Reception[]> = new BehaviorSubject<
    Reception[]
  >([]);

  constructor(
    private httpReceptionsHelper: HttpReceptionsHelperService,
    private doctorService: DoctorsService,
    private snack: SnackbarService
  ) {}

  public getReceptionsList(): void {
    this.httpReceptionsHelper
      .getReceptions<Reception[]>(RECEPTIONS_LINK)
      .pipe(
        catchError((err) => {
          if (err.status === 0) {
            this.snack.openErrorSnackBar('DB connection error!');
            return of(null);
          }
          this.snack.openErrorSnackBar(err.error.message);
          return of(null);
        })
      )
      .subscribe((result: Reception[] | null) => {
        if (result) {
          this.receptionsList$.next(result);
        }
      });
  }

  public createReception(body: any): void {
    this.httpReceptionsHelper
      .createReceptions<Reception>(RECEPTIONS_LINK, body)
      .pipe(
        catchError((err) => {
          if (err.status === 0) {
            this.snack.openErrorSnackBar('DB connection error!');
            return of(null);
          }
          this.snack.openErrorSnackBar(err.error.message);
          return of(null);
        })
      )
      .subscribe((result: Reception | null) => {
        if (result) {
          result.doctor = {};
          result.doctor = this.doctorService.doctorsList$.value.find(
            (doctor) => result.doctorId === doctor.id
          );
          this.snack.openSnackBar('Success');
          this.receptionsList$.next([...this.receptionsList$.value, result]);
          return result;
        }
        return;
      });
  }

  public deleteReception(body: any): void {
    this.httpReceptionsHelper
      .deleteReception<Reception>(RECEPTIONS_LINK, body)
      .pipe(
        catchError((err) => {
          if (err.status === 0) {
            this.snack.openErrorSnackBar('DB connection error!');
            return of(null);
          }
          this.snack.openErrorSnackBar(err.error.message);
          return of(null);
        })
      )
      .subscribe((result: Reception | null) => {
        if (result) {
          this.snack.openSnackBar('Reception successfully deleted!');
          this.receptionsList$.next(
            this.receptionsList$.value.filter((elem) => body.id !== elem.id)
          );
        }
      });
  }
}
