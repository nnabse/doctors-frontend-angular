import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';

import { Doctor } from '@interfaces/doctors.interface';

import { DoctorsService } from '@services/doctors.service';
import { ReceptionsService } from '@services/receptions.service';
import { SnackbarService } from '@services/notifications/snackbar.service';
import { Reception } from '@interfaces/reception.interface';

@Component({
  selector: 'app-reception-create',
  templateUrl: './reception-create.component.html',
  styleUrls: ['./reception-create.component.scss'],
})
export class ReceptionCreateComponent implements OnInit {
  private nameValue = '';
  private date: Date | undefined;
  private complaints = '';
  private doctorId = 0;

  public minDate = new Date();

  public doctorsList: Doctor[] | [] = [];
  constructor(
    private receptionsService: ReceptionsService,
    private doctorService: DoctorsService,
    private snack: SnackbarService
  ) {}

  public createReceptionForm: FormGroup = new FormGroup({
    patientName: new FormControl('', [Validators.required]),
    doctor: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    complaints: new FormControl('', [Validators.required]),
  });

  public getValues(): void {
    this.nameValue = this.createReceptionForm.get('patientName')?.value;
    this.doctorId = this.createReceptionForm.get('doctor')?.value;
    this.date = this.createReceptionForm.get('date')?.value;
    this.complaints = this.createReceptionForm.get('complaints')?.value;
  }

  public createReception(): void {
    this.getValues();
    const formatDate = this.date?.toLocaleDateString('en-CA');

    this.receptionsService
      .createReception({
        patientName: this.nameValue,
        doctor: { id: this.doctorId },
        date: formatDate,
        complaints: this.complaints,
      })
      .pipe(catchError((err) => this.snack.openErrorSnackBar(err)))
      .subscribe((result: Reception | null) => {
        if (!result) {
          return;
        }
        result.doctor = {};
        result.doctor = this.doctorService.doctorsList$.find(
          (doctor) => this.doctorId === doctor.id
        );
        this.snack.openSnackBar('Success');
        this.receptionsService.receptionsList$.next([
          ...this.receptionsService.receptionsList$.value,
          result,
        ]);
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
