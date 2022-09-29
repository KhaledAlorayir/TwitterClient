import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Auth, Tweet } from 'src/app/constants/interfaces';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import rt from 'dayjs/plugin/relativeTime';
import { AuthService } from 'src/app/services/API/auth.service';
import { Subscription } from 'rxjs';
import { LikeService } from 'src/app/services/API/like.service';
import { ActivatedRoute } from '@angular/router';

dayjs.extend(rt);

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
})
export class TweetCardComponent implements OnInit, OnDestroy {
  @Input() t!: Tweet;
  Likeicon = faHeart;

  auth!: Auth | null;
  authSub!: Subscription;

  isLiked!: boolean | undefined;
  isLikedLoading!: boolean;
  isLikedSub!: Subscription;
  performLikeLoading!: boolean;
  performLikeSub!: Subscription;

  constructor(
    private authServie: AuthService,
    private likeService: LikeService,
    private activedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLikedLoading = true;
    this.authSub = this.authServie.getUser().subscribe((v) => (this.auth = v));
    if (this.auth) {
      this.isLikedSub = this.likeService
        .DoILikeTweet(this.t.id)
        .subscribe((res) => {
          this.isLiked = res?.yes;
          this.isLikedLoading = false;
        });
    }
  }

  getTime(date: Date) {
    return dayjs(date).fromNow();
  }
  like() {
    this.performLikeLoading = true;
    this.performLikeSub = this.likeService
      .LikeTweet(this.t.id)
      .subscribe((res) => {
        this.performLikeLoading = false;
        if (res) {
          this.isLiked = !this.isLiked;
          if (this.isLiked) this.t.likes_count++;
          else {
            this.t.likes_count--;
            if (
              Number(this.activedRouter.parent?.snapshot.params['id']) ===
              this.auth?.user.id
            ) {
              this.likeService.setUnlikedID(this.t.id);
            }
          }
        }
      });
  }

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
    if (this.isLikedSub) this.isLikedSub.unsubscribe();
    if (this.performLikeSub) this.performLikeSub.unsubscribe();
  }
}
