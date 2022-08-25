import { Component, OnInit, OnDestroy } from '@angular/core';

import { ReceptionsService } from '@services/receptions.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-receptions-list',
  templateUrl: './receptions-list.component.html',
  styleUrls: ['./receptions-list.component.scss'],
})
export class ReceptionsListComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  public receptionsList: Object[] = [];

  private accessToken: string | null = '';
  private refreshToken: string | null = '';

  constructor(private receptionsService: ReceptionsService) {}

  displayedColumns: string[] = [
    'patientName',
    'Doctor',
    'date',
    'complaints',
    'actions',
  ];

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');

    this.receptionsService.get({
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    });
    this.subscription = this.receptionsService.receptionsList$.subscribe(
      (data) => {
        this.receptionsList = data;
      }
    );
  }

  public deleteReception(id: number): void {
    const accessToken = localStorage.getItem('accessToken');
    this.receptionsService.delete({ accessToken: accessToken, id: id });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
