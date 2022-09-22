import { UserListCardComponent } from '../components/user-list-card/user-list-card.component';

export interface Pagination<T> {
  results: T[];
  has_next: boolean;
  has_prev: boolean;
  page_number: number;
}

export interface UserListItem {
  id: number;
  username: string;
  img_url: string;
}

export interface Alert {
  type: 'ERR' | 'SUCCSS' | 'WARNING';
  message: string;
}

interface Violation {
  fieldName: string;
  message: string;
}

export interface Violations {
  violations: Violation[];
}

export interface BadRequest {
  error: string;
  message: string;
  path: string;
  status: string;
  timestamp: number;
}

export interface User {
  bio: string;
  created_at: Date;
  email: string;
  followers_count: number;
  following_count: number;
  id: number;
  img_url: string;
  likes_count: number;
  role_id: number;
  tweets_count: number;
  username: string;
}

export interface Auth {
  user: User;
  token: string;
}
