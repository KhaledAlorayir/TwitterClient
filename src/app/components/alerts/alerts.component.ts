import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/constants/interfaces';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
})
export class AlertsComponent implements OnInit, OnDestroy {
  alerts!: Alert[];
  sub!: Subscription;

  constructor(private alertService: AlertService) {
    this.sub = this.alertService
      .getAlerts()
      .subscribe((value) => (this.alerts = value));
  }

  close(index: number) {
    this.alertService.removeAlert(index);
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
