import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Auth, UserListItem } from 'src/app/constants/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/API/auth.service';
import { FollowService } from 'src/app/services/API/follow.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
})
export class UserCardComponent implements OnInit, OnDestroy {
  @Input() user!: UserListItem;
  auth!: Auth | null;
  follows!: boolean | undefined;
  initLoading!: boolean;
  followsLoading!: boolean;
  sub1!: Subscription;
  sub2!: Subscription;
  authSub!: Subscription;

  constructor(
    private authService: AuthService,
    private followService: FollowService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.getUser().subscribe((u) => {
      this.auth = u;
      this.initLoading = true;
      if (this.auth) {
        this.sub1 = this.followService
          .doIfollowUser(this.user.id)
          .subscribe((v) => {
            this.follows = v?.yes;
            this.initLoading = false;
          });
      }
    });
  }

  follow() {
    this.followsLoading = true;
    this.sub2 = this.followService.followUser(this.user.id).subscribe((res) => {
      if (res) {
        this.follows = !this.follows;
        if (this.follows) {
          this.alertService.setAlert({
            message: 'user has been followed!',
            type: 'SUCCSS',
          });
        } else {
          this.alertService.setAlert({
            message: 'user has been unfollowed!',
            type: 'SUCCSS',
          });
        }
      }
      this.followsLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
    if (this.sub1) this.sub1.unsubscribe();
    if (this.sub2) this.sub2.unsubscribe();
  }
}
