import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pagination, UserListItem } from '../../constants/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  searchByUsername(query: string, page: number) {
    return this.http.get<Pagination<UserListItem>>(
      `${environment.baseUrl}/user/search`,
      {
        params: { q: query, page },
      }
    );
  }
}
