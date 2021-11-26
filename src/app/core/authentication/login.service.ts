import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu, Token, User } from './interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(protected http: HttpClient) {}

  login(email: string, password: string, rememberMe = false) {
    return this.http.post<Token | any>('/auth/login', { email, password, remember_me: rememberMe });
  }

  refresh(params: any) {
    return this.http.post<Token | any>('/auth/refresh', params);
  }

  logout() {
    return this.http.post<any>('/auth/logout', {});
  }

  me() {
    return this.http.get<User>('/me');
  }

  menu(): Observable<{ menu: Menu[] }> {
    return this.http.get<{ menu: Menu[] }>('/me/menu');
  }
}
