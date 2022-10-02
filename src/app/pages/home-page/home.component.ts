import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Auth } from 'src/app/constants/interfaces';
import { AuthService } from 'src/app/services/API/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  auth!: Auth | null;
  authSub!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSub = this.authService.getUser().subscribe((user) => {
      this.auth = user;
    });
  }
  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
  }
}
