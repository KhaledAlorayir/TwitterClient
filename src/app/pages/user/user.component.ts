import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth, User } from 'src/app/constants/interfaces';
import { UserService } from 'src/app/services/API/user.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/API/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit, OnDestroy {
  loading!: boolean;
  user!: User | null;
  auth!: Auth | null;
  userSub!: Subscription;
  authSub!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.loading = true;
      const { id } = params;
      this.userSub = this.userService.getUserByid(id).subscribe({
        next: (user) => {
          this.user = user;
          this.loading = false;
        },
      });
    });
    this.authSub = this.authService.getUser().subscribe((u) => (this.auth = u));
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.authSub.unsubscribe();
  }
}
