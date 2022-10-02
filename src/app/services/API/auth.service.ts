import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { BehaviorSubject, Subject, switchMap } from 'rxjs';
import { Auth, User } from 'src/app/constants/interfaces';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoading = new Subject<boolean>();
  private auth = new BehaviorSubject<Auth | null>(null);
  private tempToken!: { token: string };

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router
  ) {}

  getLoading() {
    return this.isLoading.asObservable();
  }

  signup(formData: { email: string; password: string; username: string }) {
    this.isLoading.next(true);
    this.alertService.clearAlerts();
    this.http.post(`${environment.baseUrl}/auth/signup`, formData).subscribe({
      next: () => {
        this.alertService.setAlert({
          message: 'Account has been created! 😚',
          type: 'SUCCSS',
        });
        this.isLoading.next(false);
      },
      error: ({ error }: HttpErrorResponse) => {
        this.isLoading.next(false);
        this.alertService.handleErrors(error);
      },
    });
  }

  signin(email: string, password: string) {
    this.isLoading.next(true);
    this.alertService.clearAlerts();
    this.http
      .post<{ token: string }>(`${environment.baseUrl}/auth/signin`, {
        email,
        password,
      })
      .pipe(
        switchMap((res) => {
          this.tempToken = res;
          return this.getUserData(res.token);
        })
      )
      .subscribe({
        next: (v) => {
          this.isLoading.next(false);
          this.auth.next({ user: v, token: this.tempToken.token });
          localStorage.setItem('token', this.tempToken.token);
          this.router.navigate(['/home']);
        },
        error: ({ error }: HttpErrorResponse) => {
          this.isLoading.next(false);
          this.alertService.handleErrors(error);
        },
      });
  }

  signout() {
    this.auth.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  autoSignin() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoading.next(true);
      this.getUserData(token).subscribe({
        next: (user) => {
          this.auth.next({ user, token });
          this.isLoading.next(false);
        },
        error: ({ error }: HttpErrorResponse) => {
          this.signout();
          this.isLoading.next(false);
        },
      });
    }
  }

  private getUserData(token: string) {
    return this.http.get<User>(`${environment.baseUrl}/auth`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getUser() {
    return this.auth.asObservable();
  }

  updateUser(user: User) {
    this.auth.next({ token: this.auth.getValue()!.token, user });
  }
}
