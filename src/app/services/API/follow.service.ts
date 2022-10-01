import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../alert.service';
import { environment } from 'src/environments/environment';
import { catchError, of } from 'rxjs';
import { Pagination, UserListItem } from 'src/app/constants/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  constructor(private http: HttpClient, private alertService: AlertService) {}

  doIfollowUser(id: number) {
    return this.http
      .get<{ yes: boolean }>(`${environment.baseUrl}/follow/${id}`)
      .pipe(
        catchError((err) => {
          this.alertService.handleErrors(err.error);
          return of(null);
        })
      );
  }

  followUser(id: number) {
    return this.http.post(`${environment.baseUrl}/follow/${id}`, {}).pipe(
      catchError((err) => {
        this.alertService.handleErrors(err.error);
        return of(null);
      })
    );
  }

  getUserFollowers(uid: number, page: number) {
    return this.http
      .get<Pagination<UserListItem>>(
        `${environment.baseUrl}/follow/${uid}/followers`,
        { params: { page } }
      )
      .pipe(
        catchError((err) => {
          this.alertService.handleErrors(err.error);
          return of(null);
        })
      );
  }

  getUserFollowing(uid: number, page: number) {
    return this.http
      .get<Pagination<UserListItem>>(
        `${environment.baseUrl}/follow/${uid}/following`,
        { params: { page } }
      )
      .pipe(
        catchError((err) => {
          this.alertService.handleErrors(err.error);
          return of(null);
        })
      );
  }
}
