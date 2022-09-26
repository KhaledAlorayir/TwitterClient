import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Auth } from 'src/app/constants/interfaces';
import { AuthService } from 'src/app/services/API/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {}
  test() {}
}
