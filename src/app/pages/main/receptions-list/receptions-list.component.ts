import { Component, OnInit, OnDestroy } from '@angular/core';
import { Reception } from '@interfaces/reception.interface';
import { SnackbarService } from '@services/notifications/snackbar.service';

import { ReceptionsService } from '@services/receptions.service';
import { catchError, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-receptions-list',
  templateUrl: './receptions-list.component.html',
  styleUrls: ['./receptions-list.component.scss'],
})
export class ReceptionsListComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  public receptionsList: Reception[] = [];

  constructor(
    private receptionsService: ReceptionsService,
    private snack: SnackbarService
  ) {}

  displayedColumns: string[] = [
    'patientName',
    'doctor',
    'date',
    'complaints',
    'actions',
  ];

  ngOnInit(): void {
    this.receptionsService
      .getReceptionsList()
      .pipe(
        catchError((err) => {
          if (!err.status) {
            this.snack.openErrorSnackBar('DB connection error!');
            return of(null);
          }
          this.snack.openErrorSnackBar(err.error.message);
          return of(null);
        })
      )
      .subscribe((data: Reception[] | null) => {
        if (!data) {
          return;
        }
        this.receptionsService.receptionsList$.next(data);
      });

    this.subscription = this.receptionsService.receptionsList$.subscribe(
      (data) => {
        this.receptionsList = data;
      }
    );
  }

  public deleteReception(id: number): void {
    this.receptionsService
      .deleteReception({
        id: id,
      })
      .pipe(
        catchError((err) => {
          if (!err.status) {
            this.snack.openErrorSnackBar('DB connection error!');
            return of(null);
          }
          this.snack.openErrorSnackBar(err.error.message);
          return of(null);
        })
      )
      .subscribe((data: Reception | null) => {
        if (!data) {
          return;
        }
        this.snack.openSnackBar('Reception successfully deleted!');
        this.receptionsService.receptionsList$.next(
          this.receptionsService.receptionsList$.value.filter(
            (elem) => id !== elem.id
          )
        );
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
