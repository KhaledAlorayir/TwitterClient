import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Pagination, UserListItem } from 'src/app/constants/interfaces';
import { FollowService } from 'src/app/services/API/follow.service';

@Component({
  selector: 'app-user-following',
  templateUrl: './user-following.component.html',
})
export class UserFollowingComponent implements OnInit, OnDestroy {
  uid!: number;
  following!: Pagination<UserListItem> | null;
  sub!: Subscription;
  initalLoading!: boolean;
  fetchingNext!: boolean;
  page = 0;

  constructor(
    private activeRoute: ActivatedRoute,
    private followService: FollowService
  ) {}

  ngOnInit(): void {
    if (this.activeRoute.snapshot.parent?.params) {
      const { id } = this.activeRoute.snapshot.parent?.params;
      this.uid = id;
      this.loadData();
    }
  }

  loadData() {
    if (!this.following || this.following.has_next) {
      this.following ? (this.fetchingNext = true) : (this.initalLoading = true);

      this.page++;
      this.sub = this.followService
        .getUserFollowing(this.uid, this.page)
        .pipe(
          map((v) => {
            if (v && this.following) {
              v.results = [...this.following.results, ...v.results];
            }
            return v;
          })
        )
        .subscribe((following) => {
          this.following = following;
          this.initalLoading = false;
          this.fetchingNext = false;
        });
    }
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
