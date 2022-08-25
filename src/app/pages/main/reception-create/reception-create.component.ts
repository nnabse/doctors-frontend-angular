import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '@interfaces/doctors.interface';
import { DoctorsService } from '@services/doctors.service';

import { ReceptionsService } from '@services/receptions.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reception-create',
  templateUrl: './reception-create.component.html',
  styleUrls: ['./reception-create.component.scss'],
})
export class ReceptionCreateComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  private nameValue = '';
  private date: Date | undefined;
  private complaints = '';
  private accessToken: string | null = '';
  private refreshToken: string | null = '';
  private doctorId = 0;

  public doctorsList: Doctor[] = [];

  constructor(
    private receptionsService: ReceptionsService,
    private doctorService: DoctorsService
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
    this.accessToken = localStorage.getItem('accessToken');
  }

  public createReception(): void {
    this.getValues();
    const formatDate = this.date?.toISOString().split('T')[0];

    this.receptionsService.create({
      patientName: this.nameValue,
      DoctorId: this.doctorId,
      date: formatDate,
      complaints: this.complaints,
      accessToken: this.accessToken,
    });
  }

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');

    this.doctorService.get({
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    });

    this.subscription = this.doctorService.doctorsList$.subscribe((data) => {
      if (data) {
        this.doctorsList = data;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
