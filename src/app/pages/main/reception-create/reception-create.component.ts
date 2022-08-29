import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, of, Subscription } from 'rxjs';

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
export class ReceptionCreateComponent implements OnInit, OnDestroy {
  private nameValue = '';
  private date: Date | undefined;
  private complaints = '';
  private doctorId = 0;

  public doctorsList: Doctor[] | [] = [];
  private subscription = new Subscription();

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
        doctorId: this.doctorId,
        date: formatDate,
        complaints: this.complaints,
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
      .subscribe((result: Reception | null) => {
        if (!result) {
          return;
        }
        result.doctor = {};
        result.doctor = this.doctorService.doctorsList$.value.find(
          (doctor) => result.doctorId === doctor.id
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
      .pipe(
        catchError((err: any) => {
          if (!err.status) {
            this.snack.openErrorSnackBar('DB connection error!');
            return of(null);
          }
          this.snack.openErrorSnackBar(err.error.message);
          return of(null);
        })
      )
      .subscribe((data: Doctor[] | null) => {
        if (!data) {
          return;
        }
        this.doctorService.doctorsList$.next(data);
      });

    this.subscription = this.doctorService.doctorsList$.subscribe((data) => {
      this.doctorsList = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
