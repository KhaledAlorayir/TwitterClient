import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Pagination, UserListItem } from 'src/app/constants/interfaces';
import { LikeService } from 'src/app/services/API/like.service';

@Component({
  selector: 'app-tweet-likes',
  templateUrl: './tweet-likes.component.html',
})
export class TweetLikesComponent implements OnInit, OnDestroy {
  isOpen!: boolean;
  tid!: number;
  users!: Pagination<UserListItem> | null;
  sub!: Subscription;
  initalLoading!: boolean;
  fetchingNext!: boolean;
  page = 0;

  constructor(
    private activeRoute: ActivatedRoute,
    private likeService: LikeService
  ) {}

  ngOnInit(): void {
    this.tid = this.activeRoute.snapshot.params['id'];
    this.loadData();
  }

  loadData() {
    if (!this.users || this.users.has_next) {
      this.users ? (this.fetchingNext = true) : (this.initalLoading = true);

      this.page++;
      this.sub = this.likeService
        .getTweetLikes(this.tid, this.page)
        .pipe(
          map((v) => {
            if (v && this.users) {
              v.results = [...this.users.results, ...v.results];
            }
            return v;
          })
        )
        .subscribe((users) => {
          this.users = users;
          this.initalLoading = false;
          this.fetchingNext = false;
        });
    }
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
