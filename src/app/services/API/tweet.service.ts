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
}
