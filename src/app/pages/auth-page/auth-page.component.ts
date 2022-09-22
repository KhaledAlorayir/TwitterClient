import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/API/auth.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent implements OnInit {
  isLogin = true;
  isLoading = false;
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.authService.getLoading().subscribe((v) => {
      this.isLoading = v;
    });
  }

  onSubmit() {
    if (this.isLogin) {
      if (
        this.form.controls['email'].valid &&
        this.form.controls['password'].valid
      ) {
        this.authService.signin(
          this.form.value.email,
          this.form.value.password
        );
      } else {
        this.formService.setFormValidationErrors(
          new FormGroup({
            email: this.form.controls['email'],
            password: this.form.controls['password'],
          })
        );
      }
    } else {
      if (this.form.valid) {
        this.authService.signup(this.form.value);
      } else {
        this.formService.setFormValidationErrors(this.form);
      }
    }
  }
}
