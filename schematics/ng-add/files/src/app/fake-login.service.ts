import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { admin } from '@core/authentication/user';
import { LoginService } from '@core/authentication/login.service';

@Injectable()
export class FakeLoginService extends LoginService {
  private token = { access_token: 'MW56YjMyOUAxNjMuY29tWm9uZ2Jpbg==', token_type: 'bearer' };

  login() {
    // return this.http.post<TokenResponse | any>('/auth/login', {
    //   email,
    //   password,
    //   remember_me: rememberMe,
    // });
    return of(this.token);
  }

  refresh() {
    // return this.http.post<TokenResponse | any>('/auth/refresh', {});
    return of(this.token);
  }

  logout() {
    // return this.http.post('/auth/logout', {});
    return of({});
  }

  me() {
    // return this.http.get<User>('/me');
    return of(admin);
  }

  menu() {
    // return this.http.get('/me/menu');
    return this.http.get('assets/data/menu.json?_t=' + Date.now());
  }
}
