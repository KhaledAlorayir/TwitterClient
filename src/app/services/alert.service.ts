import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from '../constants/interfaces';
import { BadRequest, Violations } from 'src/app/constants/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertsArr: Alert[] = [];
  private Alerts = new Subject<Alert[]>();

  setAlert(alert: Alert) {
    this.alertsArr.push(alert);
    this.Alerts.next(this.alertsArr);
  }

  removeAlert(index: number) {
    this.alertsArr = this.alertsArr.filter((_, i) => i !== index);
    this.Alerts.next(this.alertsArr);
  }

  clearAlerts() {
    this.alertsArr = [];
    this.Alerts.next(this.alertsArr);
  }

  getAlerts() {
    return this.Alerts.asObservable();
  }

  handleErrors(err: any) {
    if (err?.violations) {
      let violations: Violations = err;
      violations.violations.forEach((v) =>
        this.setAlert({ message: v.message, type: 'ERR' })
      );
    } else {
      let badRequest: BadRequest = err;
      this.setAlert({
        message: badRequest.message,
        type: 'ERR',
      });
    }
  }

  constructor() {}
}
