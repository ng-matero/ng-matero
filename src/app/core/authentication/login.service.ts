import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token, User } from './interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(protected http: HttpClient) {}

  login(email: string, password: string, rememberMe = false): Observable<Token> {
    return this.http.post<Token>('/auth/login', { email, password, remember_me: rememberMe });
  }

  refresh(params: any): Observable<Token> {
    return this.http.post<Token>('/auth/refresh', params);
  }

  logout(): Observable<any> {
    return this.http.post<any>('/auth/logout', {});
  }

  me(): Observable<User> {
    return this.http.get<User>('/me');
  }

  menu(): Observable<any> {
    return this.http.get('/me/menu');
  }
}
