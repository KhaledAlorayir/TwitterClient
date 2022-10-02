import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Auth } from 'src/app/constants/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/API/auth.service';
import { UserService } from 'src/app/services/API/user.service';

@Component({
  selector: 'app-change-bio',
  templateUrl: './change-bio.component.html',
})
export class ChangeBioComponent implements OnInit, OnDestroy {
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
      bio: new FormControl(this.auth!.user.bio),
    });

    this.form.controls['bio'].valueChanges.subscribe((t) => {
      if (t?.length > 300) {
        this.aboveLimit = true;
      } else {
        this.aboveLimit = false;
      }
    });
  }

  onSubmit() {
    if (!this.aboveLimit && !this.isEmpty()) {
      if (this.form.value['bio'].trim() === this.auth?.user.bio)
        return this.close();

      this.loading = true;
      this.changeSub = this.userService
        .changeBio(this.form.value['bio'])
        .subscribe((user) => {
          if (user) {
            this.alertService.setAlert({
              message: 'bio has been changed!',
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
    if (this.form.value['bio']) return this.form.value['bio'].trim() === '';
    return true;
  }

  close() {
    this.isModalOpen = false;
    this.form.controls['bio'].setValue(this.auth!.user.bio);
  }

  ngOnDestroy(): void {
    if (this.changeSub) this.changeSub.unsubscribe();
    if (this.authSub) this.authSub.unsubscribe();
  }
}
