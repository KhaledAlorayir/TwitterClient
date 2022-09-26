import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Pagination, Tweet } from 'src/app/constants/interfaces';
import { TweetService } from 'src/app/services/API/tweet.service';

@Component({
  selector: 'app-user-tweets',
  templateUrl: './user-tweets.component.html',
})
export class UserTweetsComponent implements OnInit, OnDestroy {
  userTweets!: Pagination<Tweet> | null;
  loading!: boolean;
  fetchingNext!: boolean;
  sub!: Subscription;
  page = 0;
  uid!: number;

  constructor(
    private tweetService: TweetService,
    private activedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const { id } = this.activedRouter.snapshot.params;
    this.uid = id;
    this.loadData();
  }

  loadData() {
    if (!this.userTweets || this.userTweets.has_next) {
      this.userTweets ? (this.fetchingNext = true) : (this.loading = true);

      this.page++;
      this.sub = this.tweetService
        .getUserTweets(this.uid, this.page)
        .pipe(
          map((v) => {
            if (v && this.userTweets) {
              v.results = [...this.userTweets.results, ...v.results];
            }
            return v;
          })
        )
        .subscribe((tweets) => {
          this.userTweets = tweets;
          this.loading = false;
          this.fetchingNext = false;
        });
    }
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
