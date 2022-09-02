import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { catchError, take } from 'rxjs';

import { SnackbarService } from '@services/notifications/snackbar.service';
import { ReceptionsService } from '@services/receptions.service';

import { Reception } from '@interfaces/reception.interface';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
})
export class SortingComponent implements OnInit {
  public isDateFiltering = false;

  private start: Date | undefined;
  private end: Date | undefined;

  public sortingOptions = [
    { value: 'patientName', name: 'Name' },
    { value: 'doctor', name: 'Doctor' },
    { value: 'date', name: 'Date' },
    { value: 'complaints', name: 'Complaints' },
  ];

  public sortDirections = [
    { value: 'asc', name: 'Increasing' },
    { value: 'desc', name: 'Decreasing' },
  ];

  constructor(
    private receptionsService: ReceptionsService,
    private snack: SnackbarService
  ) {}

  ngOnInit(): void {
    this.sortForm.valueChanges.pipe(take(1)).subscribe();
  }

  public sortForm: FormGroup = new FormGroup({
    sortingOption: new FormControl('date', Validators.required),
    sortMethod: new FormControl('asc', Validators.required),
  });

  public filterForm: FormGroup = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  });

  public toggleDateFiltering(flag: boolean) {
    this.filterForm.reset();
    this.isDateFiltering = flag;
    if (!flag) {
      this.submitSort();
    }
  }

  public submitSort(): void {
    const sortOption = this.sortForm.get('sortingOption')?.value;
    const sortMethod = this.sortForm.get('sortMethod')?.value;

    this.start = this.filterForm.get('start')?.value;
    this.end = this.filterForm.get('end')?.value;

    let formatStart;
    let formatEnd;

    if (this.start && this.end) {
      formatStart = this.start?.toLocaleDateString('en-CA');
      formatEnd = this.end?.toLocaleDateString('en-CA');
    }

    this.receptionsService
      .getReceptionsList(
        { sortOption, sortMethod },
        { startDate: formatStart, endDate: formatEnd }
      )
      .pipe(catchError((err) => this.snack.openErrorSnackBar(err)))
      .subscribe((result: Reception[] | null) => {
        if (!result) {
          return;
        }
        this.receptionsService.receptionsList$.next(result);
      });
  }
}
