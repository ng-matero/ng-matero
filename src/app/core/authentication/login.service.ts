import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User, Token, RefreshToken } from './interface';
import { ConfigService } from './config.service';
import { Menu } from '@core';

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

  refresh(params: RefreshToken) {
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
