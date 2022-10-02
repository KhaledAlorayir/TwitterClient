import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pagination, User, UserListItem } from '../../constants/interfaces';
import { catchError, of, Subject } from 'rxjs';
import { AlertService } from '../alert.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private alertService: AlertService) {}

  searchByUsername(query: string, page: number) {
    return this.http.get<Pagination<UserListItem>>(
      `${environment.baseUrl}/user/search`,
      {
        params: { q: query, page },
      }
    );
  }

  getUserByid(id: string) {
    return this.http.get<User>(`${environment.baseUrl}/user/${id}`).pipe(
      catchError((err) => {
        this.alertService.handleErrors(err.error);
        return of(null);
      })
    );
  }

  changeUsername(username: string) {
    return this.http
      .patch<User>(`${environment.baseUrl}/user/username`, { username })
      .pipe(
        catchError((err) => {
          this.alertService.handleErrors(err.error);
          return of(null);
        })
      );
  }

  changeBio(bio: string) {
    return this.http
      .patch<User>(`${environment.baseUrl}/user/bio`, { bio })
      .pipe(
        catchError((err) => {
          this.alertService.handleErrors(err.error);
          return of(null);
        })
      );
  }

  changeImgviaURL(img_url: string) {
    return this.http
      .patch<User>(`${environment.baseUrl}/user/imgurl`, { img_url })
      .pipe(
        catchError((err) => {
          this.alertService.handleErrors(err.error);
          return of(null);
        })
      );
  }

  changeImgviaFile(img_url: string) {
    return this.http
      .patch<User>(`${environment.baseUrl}/user/imgurl`, { img_url })
      .pipe(
        catchError((err) => {
          this.alertService.handleErrors(err.error);
          return of(null);
        })
      );
  }
}
