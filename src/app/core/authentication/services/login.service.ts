import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService, RefreshToken, Token, User } from '@core/authentication';
import { Menu } from '@core/bootstrap/menu.service';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {
  constructor(protected http: HttpClient, protected configService: ConfigService) {}

  login(email: string, password: string, rememberMe = false) {
    const params = { email, password, remember_me: rememberMe };

    return this.http.post<Token>(this.configService.getLoginUrl(), params);
  }

  refresh(refreshToken?: RefreshToken) {
    return this.http.post<Token>(this.configService.getRefreshUrl(), refreshToken);
  }

  logout() {
    return this.http.post(this.configService.getLogoutUrl(), {});
  }

  me() {
    return this.http.get<User>(this.configService.getProfileUrl());
  }

  menu() {
    return this.http
      .get<{ menu: Menu[] }>(this.configService.getMenuUrl())
      .pipe(map(res => res.menu));
  }
}
