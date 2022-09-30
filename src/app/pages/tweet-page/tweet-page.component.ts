import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Pagination, Tweet } from 'src/app/constants/interfaces';
import { TweetService } from 'src/app/services/API/tweet.service';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tweet-page',
  templateUrl: './tweet-page.component.html',
})
export class TweetPageComponent implements OnInit, OnDestroy {
  tweet!: Tweet;
  tweetSub!: Subscription;
  tweetLoading!: boolean;

  replies!: Pagination<Tweet> | null;
  repliesSub!: Subscription;
  repliesInitalLoading!: boolean;
  repliesNextPageLoading!: boolean;
  page = 0;

  original!: Tweet | null;
  originalSub!: Subscription;
  originalLoading!: boolean;
  originalIcon = faArrowUp;

  DeletedSub!: Subscription;
  newReplaySub!: Subscription;

  constructor(
    private activeRouter: ActivatedRoute,
    private tweetService: TweetService
  ) {}

  ngOnInit(): void {
    this.activeRouter.params.subscribe(({ id }) => {
      this.replies = null;
      this.original = null;
      this.page = 0;
      this.loadTweet(id);
    });

    this.handleDelete();
    this.handleNewReplay();
  }

  loadTweet(tid: number) {
    this.tweetLoading = true;
    this.tweetSub = this.tweetService.getTweet(tid).subscribe((res) => {
      if (res) {
        this.tweet = res;
        if (res.responses_count > 0) {
          this.loadReplies(tid);
        }
        if (res.replay) {
          this.loadOriginal(res.id);
        }
      }
      this.tweetLoading = false;
    });
  }

  loadReplies(tid: number) {
    if (!this.replies || this.replies.has_next) {
      this.replies
        ? (this.repliesNextPageLoading = true)
        : (this.repliesInitalLoading = true);
      this.page++;

      this.repliesSub = this.tweetService
        .getTweetReplies(tid, this.page)
        .pipe(
          map((v) => {
            if (v && this.replies) {
              v.results = [...this.replies.results, ...v.results];
            }
            return v;
          })
        )
        .subscribe((res) => {
          this.repliesInitalLoading = false;
          this.repliesNextPageLoading = false;
          this.replies = res;
        });
    }
  }

  loadOriginal(tid: number) {
    this.originalLoading = true;
    this.originalSub = this.tweetService
      .getOriginalTweet(tid)
      .subscribe((res) => {
        this.original = res;
        this.originalLoading = false;
      });
  }

  handleDelete() {
    this.DeletedSub = this.tweetService.getDeletedId().subscribe((id) => {
      if (id) {
        if (id === this.original?.id) {
          this.original = null;
        } else if (this.replies) {
          this.replies.results = this.replies?.results.filter(
            (t) => t.id !== id
          );
        }
        this.tweetService.clearDeletedId();
      }
    });
  }

  handleNewReplay() {
    this.newReplaySub = this.tweetService.getReplay().subscribe((replay) => {
      if (replay && replay.response_to === this.tweet.id) {
        if (this.replies) {
          this.replies.results.push(replay.tweet);
        } else {
          this.replies = {
            has_next: false,
            has_prev: false,
            page_number: 0,
            results: [replay.tweet],
          };
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.tweetSub) this.tweetSub.unsubscribe();
    if (this.repliesSub) this.repliesSub.unsubscribe();
    if (this.originalSub) this.originalSub.unsubscribe();
    if (this.DeletedSub) this.DeletedSub.unsubscribe();
    if (this.newReplaySub) this.newReplaySub.unsubscribe();
  }
}
