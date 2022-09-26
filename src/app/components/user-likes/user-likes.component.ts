import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Pagination, Tweet } from 'src/app/constants/interfaces';
import { LikeService } from 'src/app/services/API/like.service';

@Component({
  selector: 'app-user-likes',
  templateUrl: './user-likes.component.html',
})
export class UserLikesComponent implements OnInit, OnDestroy {
  userLikes!: Pagination<Tweet> | null;
  loading!: boolean;
  fetchingNext!: boolean;
  sub!: Subscription;
  page = 0;
  uid!: number;

  constructor(
    private likeService: LikeService,
    private activedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.activedRouter.snapshot.parent?.params) {
      const { id } = this.activedRouter.snapshot.parent?.params;
      this.uid = id;
      this.loadData();
    }
  }

  loadData() {
    if (!this.userLikes || this.userLikes.has_next) {
      this.userLikes ? (this.fetchingNext = true) : (this.loading = true);

      this.page++;
      this.sub = this.likeService
        .getUserLikes(this.uid, this.page)
        .pipe(
          map((v) => {
            if (v && this.userLikes) {
              v.results = [...this.userLikes.results, ...v.results];
            }
            return v;
          })
        )
        .subscribe((tweets) => {
          this.userLikes = tweets;
          this.loading = false;
          this.fetchingNext = false;
        });
    }
  }
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
