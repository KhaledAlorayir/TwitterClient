import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../alert.service';
import { environment } from 'src/environments/environment';
import { Pagination, Tweet } from 'src/app/constants/interfaces';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
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
}
