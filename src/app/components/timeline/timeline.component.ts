import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Pagination, Tweet } from 'src/app/constants/interfaces';
import { TweetService } from 'src/app/services/API/tweet.service';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
})
export class TimelineComponent implements OnInit, OnDestroy {
  timeline!: Pagination<Tweet> | null;
  loading!: boolean;
  fetchingNext!: boolean;
  sub!: Subscription;
  page = 0;
  icon = faArrowsRotate;

  constructor(private tweetService: TweetService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    if (!this.timeline || this.timeline.has_next) {
      this.timeline ? (this.fetchingNext = true) : (this.loading = true);

      this.page++;
      this.sub = this.tweetService
        .getTimeline(this.page)
        .pipe(
          map((v) => {
            if (v && this.timeline) {
              v.results = [...this.timeline.results, ...v.results];
            }
            return v;
          })
        )
        .subscribe((tweets) => {
          this.timeline = tweets;
          this.loading = false;
          this.fetchingNext = false;
        });
    }
  }

  refresh() {
    this.timeline = null;
    this.page = 0;
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
