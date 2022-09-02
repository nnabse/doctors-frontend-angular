import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { catchError } from 'rxjs';

import { Doctor } from '@interfaces/doctors.interface';
import { Reception } from '@interfaces/reception.interface';

import { DoctorsService } from '@services/doctors.service';
import { SnackbarService } from '@services/notifications/snackbar.service';
import { ReceptionsService } from '@services/receptions.service';

@Component({
  selector: 'app-rename-dialog',
  templateUrl: './rename-dialog.component.html',
  styleUrls: ['./rename-dialog.component.scss'],
})
export class RenameDialogComponent implements OnInit {
  public doctorsList: Doctor[] = [];
  public renameForm: FormGroup;
  public minDate = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Reception,
    private receptionsService: ReceptionsService,
    private doctorService: DoctorsService,
    private snack: SnackbarService
  ) {
    this.renameForm = new FormGroup({
      patientName: new FormControl(data.patientName, [Validators.required]),
      doctor: new FormControl(data.doctor?.id, [Validators.required]),
      date: new FormControl(data.date, [Validators.required]),
      complaints: new FormControl(data.complaints, [Validators.required]),
    });
  }

  public renameReception(): void {
    if (!this.data.id) {
      return;
    }
    const id = this.data.id;

    const updatedReception = {
      patientName: this.renameForm.get('patientName')?.value,
      doctor: this.doctorsList.find(
        (item) => item.id === this.renameForm.get('doctor')?.value
      ),
      date: this.renameForm.get('date')?.value,
      complaints: this.renameForm.get('complaints')?.value,
      id,
    };

    this.receptionsService
      .renameReception(id, updatedReception)
      .pipe(catchError((err) => this.snack.openErrorSnackBar(err)))
      .subscribe((result) => {
        if (!result) {
          return;
        }
        this.snack.openSnackBar('Reception successfully updated!');
        const updatedRecept = this.receptionsService.receptionsList$.value.map(
          (elem) => {
            if (elem.id === id) {
              return updatedReception;
            }
            return elem;
          }
        );
        this.receptionsService.receptionsList$.next(updatedRecept);
      });
  }

  ngOnInit(): void {
    this.doctorService
      .getDoctorList()
      .pipe(catchError((err) => this.snack.openErrorSnackBar(err)))
      .subscribe((data: Doctor[] | null) => {
        if (!data) {
          return;
        }
        this.doctorService.doctorsList$ = data;
        this.doctorsList = this.doctorService.doctorsList$;
      });
  }
}
