import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Auth, User } from 'src/app/constants/interfaces';
import dayjs from 'dayjs';
import { Subscription } from 'rxjs';
import { FollowService } from 'src/app/services/API/follow.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
})
export class UserHeaderComponent implements OnInit, OnDestroy {
  @Input() user!: User;
  @Input() auth!: Auth | null;
  follows!: boolean | undefined;
  initLoading!: boolean;
  followsLoading!: boolean;
  sub1!: Subscription;
  sub2!: Subscription;

  constructor(private followService: FollowService) {}

  ngOnInit(): void {
    this.initLoading = true;
    if (this.auth) {
      this.sub1 = this.followService
        .doIfollowUser(this.user.id)
        .subscribe((v) => {
          this.follows = v?.yes;
          this.initLoading = false;
        });
    }
  }

  getJoinedDate() {
    return dayjs(this.user?.created_at).format('MMM YYYY');
  }

  follow() {
    this.followsLoading = true;
    this.sub2 = this.followService.followUser(this.user.id).subscribe((res) => {
      if (res) {
        this.follows = !this.follows;
        if (this.follows) {
          this.user.followers_count++;
        } else {
          this.user.followers_count--;
        }
      }
      this.followsLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    if (this.sub2) this.sub2.unsubscribe();
  }
}
