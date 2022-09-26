import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../alert.service';
import { environment } from 'src/environments/environment';
import { Pagination, Tweet } from 'src/app/constants/interfaces';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
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
}
