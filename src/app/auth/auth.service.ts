import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../shared/api/api.service';
import { User } from '../shared/api/types';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService) {}

  user(): Observable<User> {
    return this.apiService.get('/user').pipe(map(result => result.user));
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.apiService
      .post('/users/login', { user: credentials })
      .pipe(map(r => r.user));
  }

  register(credentials: {
    username: string;
    email: string;
    password: string;
  }): Observable<User> {
    return this.apiService
      .post('/users', { user: credentials })
      .pipe(map(r => r.user));
  }
}
