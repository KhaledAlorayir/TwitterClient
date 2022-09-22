import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Auth } from 'src/app/constants/interfaces';
import { AuthService } from 'src/app/services/API/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  inputError = false;
  auth!: Auth | null;
  sub!: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      searchQuery: new FormControl('', Validators.required),
    });

    this.sub = this.authService.getUser().subscribe((v) => {
      this.auth = v;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.inputError = false;
      this.router.navigate(['/search'], {
        queryParams: { q: this.form.value.searchQuery },
      });
      this.form.reset();
      return;
    }
    this.inputError = true;
  }

  logout() {
    this.authService.signout();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
