import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Auth, Tweet } from 'src/app/constants/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { TweetService } from 'src/app/services/API/tweet.service';

@Component({
  selector: 'app-tweet-replay',
  templateUrl: './tweet-replay.component.html',
})
export class TweetReplayComponent implements OnInit, OnDestroy {
  @Input() auth!: Auth | null;
  @Input() t!: Tweet;
  isModalOpen = false;
  icon = faReply;
  form!: FormGroup;
  aboveLimit = false;
  ReplaySub!: Subscription;
  ReplayLoading!: boolean;
  id!: string;
  constructor(
    private tweetService: TweetService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      replay: new FormControl(''),
    });

    this.form.controls['replay'].valueChanges.subscribe((t) => {
      if (t?.length > 280) {
        this.aboveLimit = true;
      } else {
        this.aboveLimit = false;
      }
    });
  }

  onSubmit() {
    if (!this.aboveLimit && !this.isEmpty()) {
      this.ReplayLoading = true;
      this.ReplaySub = this.tweetService
        .replaytoTweet(this.t.id, this.form.value['replay'])
        .subscribe((tweet) => {
          console.log(tweet);
          this.isModalOpen = false;
          if (tweet) {
            this.alertService.setAlert({
              message: 'replay has been sent!',
              type: 'SUCCSS',
            });
            this.t.responses_count++;
          }
          this.ReplayLoading = false;
          this.form.reset();
        });
    }
  }

  close() {
    this.isModalOpen = false;
    this.form.reset();
  }

  isEmpty() {
    if (this.form.value['replay'])
      return this.form.value['replay'].trim() === '';
    return true;
  }

  ngOnDestroy(): void {
    if (this.ReplaySub) this.ReplaySub.unsubscribe();
  }
}
