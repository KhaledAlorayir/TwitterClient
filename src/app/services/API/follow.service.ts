import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../alert.service';
import { environment } from 'src/environments/environment';
import { catchError, of } from 'rxjs';

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
}
