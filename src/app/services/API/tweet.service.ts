import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../alert.service';
import { environment } from 'src/environments/environment';
import { Pagination, Tweet } from 'src/app/constants/interfaces';
import { catchError, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  private DeletedTweetId = new Subject<number | null>();
  private Replay = new Subject<{ tweet: Tweet; response_to: number } | null>();

  constructor(private http: HttpClient, private alertService: AlertService) {}

  getUserTweets(id: number, page: number) {
    return this.http
      .get<Pagination<Tweet>>(`${environment.baseUrl}/tweet/${id}/user`, {
        params: { page },
      })
      .pipe(
        catchError((err) => {
          this.alertService.handleErrors(err.error);
          return of(null);
        })
      );
  }

  deleteTweet(tid: number) {
    return this.http.delete(`${environment.baseUrl}/tweet/${tid}`).pipe(
      catchError((err) => {
        this.alertService.handleErrors(err.error);
        return of(null);
      })
    );
  }

  setReplay(tweet: Tweet, original_id: number) {
    this.Replay.next({ tweet, response_to: original_id });
  }

  clearReplay() {
    this.Replay.next(null);
  }

  getReplay() {
    return this.Replay.asObservable();
  }

  setDeletedId(id: number) {
    this.DeletedTweetId.next(id);
  }

  clearDeletedId() {
    this.DeletedTweetId.next(null);
  }

  getDeletedId() {
    return this.DeletedTweetId.asObservable();
  }

  replaytoTweet(tid: number, content: string) {
    return this.http
      .post<Tweet>(`${environment.baseUrl}/tweet/${tid}`, { content })
      .pipe(
        catchError((err) => {
          this.alertService.handleErrors(err.error);
          return of(null);
        })
      );
  }

  getTweet(tid: number) {
    return this.http.get<Tweet>(`${environment.baseUrl}/tweet/${tid}`).pipe(
      catchError((err) => {
        this.alertService.handleErrors(err.error);
        return of(null);
      })
    );
  }

  getTweetReplies(tid: number, page: number) {
    return this.http
      .get<Pagination<Tweet>>(`${environment.baseUrl}/tweet/${tid}/replies`, {
        params: { page },
      })
      .pipe(
        catchError((err) => {
          this.alertService.handleErrors(err.error);
          return of(null);
        })
      );
  }

  getOriginalTweet(tid: number) {
    return this.http
      .get<Tweet>(`${environment.baseUrl}/tweet/${tid}/original`)
      .pipe(
        catchError((err) => {
          this.alertService.handleErrors(err.error);
          return of(null);
        })
      );
  }
}
