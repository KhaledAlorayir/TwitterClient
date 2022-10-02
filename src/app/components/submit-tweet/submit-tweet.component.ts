import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { TweetService } from 'src/app/services/API/tweet.service';

@Component({
  selector: 'app-submit-tweet',
  templateUrl: './submit-tweet.component.html',
})
export class SubmitTweetComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isModalOpen = false;
  aboveLimit = false;
  TweetSub!: Subscription;
  TweetLoading!: boolean;
  constructor(
    private tweetService: TweetService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      content: new FormControl(''),
    });

    this.form.controls['content'].valueChanges.subscribe((t) => {
      if (t?.length > 280) {
        this.aboveLimit = true;
      } else {
        this.aboveLimit = false;
      }
    });
  }

  onSubmit() {
    if (!this.aboveLimit && !this.isEmpty()) {
      this.TweetLoading = true;
      this.TweetSub = this.tweetService
        .makeTweet(this.form.value['content'])
        .subscribe((tweet) => {
          this.isModalOpen = false;
          if (tweet) {
            console.log(tweet);
            this.alertService.setAlert({
              message: 'tweet has been sent!',
              type: 'SUCCSS',
            });
          }
          this.TweetLoading = false;
          this.form.reset();
        });
    }
  }

  isEmpty() {
    if (this.form.value['content'])
      return this.form.value['content'].trim() === '';
    return true;
  }

  close() {
    this.isModalOpen = false;
    this.form.reset();
  }

  ngOnDestroy(): void {
    if (this.TweetSub) this.TweetSub.unsubscribe();
  }
}
