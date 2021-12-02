import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token, User } from './interface';
import { Menu } from '@core';
import { map } from 'rxjs/operators';
import { ConfigService } from '@core/authentication/config.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(protected http: HttpClient, private configService: ConfigService) {}

  login(email: string, password: string, rememberMe = false) {
    return this.http.post<Token>(this.configService.getLoginUrl(), {
      email,
      password,
      remember_me: rememberMe,
    });
  }

  refresh(params: { [k: string]: any; refresh_token?: string }) {
    return this.http.post<Token>(this.configService.getRefreshUrl(), params);
  }

  logout() {
    return this.http.post(this.configService.getLogoutUrl(), {});
  }

  profile() {
    return this.http.get<User>(this.configService.getProfileUrl());
  }

  menu() {
    return this.http
      .get<{ menu: Menu[] }>(this.configService.getMenuUrl())
      .pipe(map(res => res.menu));
  }
}
