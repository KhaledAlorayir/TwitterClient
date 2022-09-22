import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private alertService: AlertService) {}

  setFormValidationErrors(form: FormGroup) {
    this.alertService.clearAlerts();
    Object.keys(form.controls).forEach((key) => {
      const controlErrors = form?.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          if (keyError === 'required') {
            this.alertService.setAlert({
              message: `${key} is required`,
              type: 'ERR',
            });
          } else {
            this.alertService.setAlert({
              message: `${key} should be valid`,
              type: 'ERR',
            });
          }
        });
      }
    });
  }
}
