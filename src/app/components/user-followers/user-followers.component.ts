import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Pagination, UserListItem } from 'src/app/constants/interfaces';
import { FollowService } from 'src/app/services/API/follow.service';

@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
})
export class UserFollowersComponent implements OnInit, OnDestroy {
  uid!: number;
  followers!: Pagination<UserListItem> | null;
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
    if (!this.followers || this.followers.has_next) {
      this.followers ? (this.fetchingNext = true) : (this.initalLoading = true);

      this.page++;
      this.sub = this.followService
        .getUserFollowers(this.uid, this.page)
        .pipe(
          map((v) => {
            if (v && this.followers) {
              v.results = [...this.followers.results, ...v.results];
            }
            return v;
          })
        )
        .subscribe((followers) => {
          this.followers = followers;
          this.initalLoading = false;
          this.fetchingNext = false;
        });
    }
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
