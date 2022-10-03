import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Auth } from 'src/app/constants/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/API/auth.service';
import { UserService } from 'src/app/services/API/user.service';

@Component({
  selector: 'app-change-image',
  templateUrl: './change-image.component.html',
})
export class ChangeImageComponent implements OnInit, OnDestroy {
  isModalOpen!: boolean;
  isLink = true;
  auth!: Auth | null;
  authSub!: Subscription;
  form!: FormGroup;
  changeSub!: Subscription;
  loading!: boolean;
  invalidLink!: boolean;
  invalidFile!: boolean;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.getUser().subscribe((u) => (this.auth = u));

    this.form = new FormGroup({
      link: new FormControl(
        '',
        Validators.pattern(
          '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
        )
      ),
      file: new FormControl(null),
    });
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files![0];
    this.form.controls['file'].setValue(file);
  }

  onSubmit() {
    if (this.isLink) {
      this.submitLink();
    } else {
      this.submitFile();
    }
  }

  submitLink() {
    if (this.form.controls['link'].valid && !this.isEmpty()) {
      this.loading = true;
      this.changeSub = this.userService
        .changeImgviaURL(this.form.value['link'])
        .subscribe((user) => {
          if (user) {
            this.alertService.setAlert({
              message: 'image has been changed!',
              type: 'SUCCSS',
            });
            this.authService.updateUser(user);
          }
          this.loading = false;
          this.close();
        });
    } else {
      this.invalidLink = true;
    }
  }

  submitFile() {
    if (this.form.value['file']) {
      const formdata = new FormData();
      formdata.append('image', this.form.value['file']);

      this.loading = true;
      this.changeSub = this.userService
        .changeImgviaFile(formdata)
        .subscribe((user) => {
          if (user) {
            this.alertService.setAlert({
              message: 'image has been changed!',
              type: 'SUCCSS',
            });
            this.authService.updateUser(user);
          }
          this.loading = false;
          this.close();
        });
    } else {
      this.invalidFile = true;
    }
  }

  switch() {
    this.isLink = !this.isLink;
    this.form.reset();
    this.invalidLink = false;
    this.invalidFile = false;
  }

  isEmpty() {
    if (this.form.value['link']) return this.form.value['link'].trim() === '';
    return true;
  }
  close() {
    this.invalidLink = false;
    this.invalidLink = false;
    this.isModalOpen = false;
    this.form.reset();
  }

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
  }
}
