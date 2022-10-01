import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../alert.service';
import { environment } from 'src/environments/environment';
import { Pagination, Tweet, UserListItem } from 'src/app/constants/interfaces';
import { catchError, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private UnlikedTweetId = new Subject<number | null>();

  constructor(private http: HttpClient, private alertService: AlertService) {}

  getUserLikes(id: number, page: number) {
    return this.http
      .get<Pagination<Tweet>>(`${environment.baseUrl}/like/${id}/user`, {
        params: { page },
      })
      .pipe(
        catchError((err) => {
          this.alertService.handleErrors(err.error);
          return of(null);
        })
      );
  }

  DoILikeTweet(id: number) {
    return this.http
      .get<{ yes: boolean }>(`${environment.baseUrl}/like/does/${id}`)
      .pipe(
        catchError((err) => {
          this.alertService.handleErrors(err.error);
          return of(null);
        })
      );
  }

  LikeTweet(id: number) {
    return this.http.post(`${environment.baseUrl}/like/${id}`, {}).pipe(
      catchError((err) => {
        this.alertService.handleErrors(err.error);
        return of(null);
      })
    );
  }

  getTweetLikes(tid: number, page: number) {
    return this.http
      .get<Pagination<UserListItem>>(`${environment.baseUrl}/like/${tid}`, {
        params: { page },
      })
      .pipe(
        catchError((err) => {
          this.alertService.handleErrors(err.error);
          return of(null);
        })
      );
  }

  setUnlikedID(id: number) {
    this.UnlikedTweetId.next(id);
  }

  clearUnlikedID() {
    this.UnlikedTweetId.next(null);
  }

  getUnlikedID() {
    return this.UnlikedTweetId.asObservable();
  }
}
