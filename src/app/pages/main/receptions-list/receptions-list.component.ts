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

  constructor(private receptionsService: ReceptionsService) {}

  displayedColumns: string[] = [
    'patientName',
    'doctor',
    'date',
    'complaints',
    'actions',
  ];

  ngOnInit(): void {
    this.receptionsService.getReceptionsList();
    this.subscription = this.receptionsService.receptionsList$.subscribe(
      (data) => {
        this.receptionsList = data;
      }
    );
  }

  public deleteReception(id: number): void {
    this.receptionsService.deleteReception({
      id: id,
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
