import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Auth } from 'src/app/constants/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/API/auth.service';
import { UserService } from 'src/app/services/API/user.service';

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
})
export class ChangeUsernameComponent implements OnInit, OnDestroy {
  auth!: Auth | null;
  authSub!: Subscription;
  isModalOpen!: boolean;
  form!: FormGroup;
  changeSub!: Subscription;
  loading!: boolean;
  aboveLimit = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.getUser().subscribe((u) => (this.auth = u));

    this.form = new FormGroup({
      username: new FormControl(this.auth!.user.username),
    });

    this.form.controls['username'].valueChanges.subscribe((t) => {
      if (t?.length > 25) {
        this.aboveLimit = true;
      } else {
        this.aboveLimit = false;
      }
    });
  }

  onSubmit() {
    if (!this.aboveLimit && !this.isEmpty()) {
      if (this.form.value['username'].trim() === this.auth?.user.username)
        return this.close();

      this.loading = true;
      this.changeSub = this.userService
        .changeUsername(this.form.value['username'])
        .subscribe((user) => {
          if (user) {
            this.alertService.setAlert({
              message: 'username has been changed!',
              type: 'SUCCSS',
            });
            this.authService.updateUser(user);
          }
          this.loading = false;
          this.close();
        });
    }
  }

  isEmpty() {
    if (this.form.value['username'])
      return this.form.value['username'].trim() === '';
    return true;
  }

  close() {
    this.isModalOpen = false;
    this.form.controls['username'].setValue(this.auth!.user.username);
  }

  ngOnDestroy(): void {
    if (this.changeSub) this.changeSub.unsubscribe();
    if (this.authSub) this.authSub.unsubscribe();
  }
}
