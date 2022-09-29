import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Auth, Tweet } from 'src/app/constants/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { TweetService } from 'src/app/services/API/tweet.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tweet-delete',
  templateUrl: './tweet-delete.component.html',
})
export class TweetDeleteComponent implements OnInit, OnDestroy {
  @Input() auth!: Auth | null;
  @Input() t!: Tweet;

  isModalOpen = false;
  Sub!: Subscription;
  Loading!: boolean;

  icon = faTrash;

  constructor(
    private tweetService: TweetService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {}

  deleteTweet() {
    this.Loading = true;
    this.tweetService.deleteTweet(this.t.id).subscribe((res) => {
      this.Loading = false;
      this.isModalOpen = false;
      if (res) {
        this.tweetService.setDeletedId(this.t.id);
        this.alertService.setAlert({
          message: 'tweet has been deleted!',
          type: 'SUCCSS',
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.Sub) this.Sub.unsubscribe();
  }
}
