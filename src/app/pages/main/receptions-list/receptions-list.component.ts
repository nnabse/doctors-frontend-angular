import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '@components/delete-dialog/delete-dialog.component';
import { RenameDialogComponent } from '@components/rename-dialog/rename-dialog.component';

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
    private snack: SnackbarService,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = [
    'patientName',
    'doctor',
    'date',
    'complaints',
    'actions',
  ];

  public sortingOptions: string[] = [
    'Clear',
    'Name',
    'Doctor',
    'Date',
    'Complaints',
  ];

  public sortDirections: string[] = ['Increasing', 'Decreasing'];

  public sortMethod = '';
  public isDateFiltering = false;

  ngOnInit(): void {
    this.receptionsService
      .getReceptionsList()
      .pipe(
        catchError((err) => {
          const errMsg = !err.status
            ? 'DB connection error!'
            : err.error.message;
          this.snack.openErrorSnackBar(errMsg);
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

  public openDeleteDialog(id: number): void {
    this.dialog
      .open(DeleteDialogComponent)
      .afterClosed()
      .subscribe((answ) => {
        if (!answ) {
          return;
        }
        this.deleteReception(id);
      });
  }

  public openRenameDialog(reception: Reception): void {
    this.dialog.open(RenameDialogComponent, {
      width: '45%',
      data: { ...reception },
    });
  }

  public deleteReception(id: number): void {
    this.receptionsService
      .deleteReception(id)
      .pipe(
        catchError((err) => {
          const errMsg = !err.status
            ? 'DB connection error!'
            : err.error.message;
          this.snack.openErrorSnackBar(errMsg);
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
