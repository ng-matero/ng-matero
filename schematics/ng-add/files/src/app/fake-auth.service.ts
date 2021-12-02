import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService, Menu, RefreshToken } from '@core';

/**
 * You should delete this file in the real APP.
 */
@Injectable()
export class FakeAuthService extends AuthService {
  private token = { access_token: 'MW56YjMyOUAxNjMuY29tWm9uZ2Jpbg==', token_type: 'bearer' };

  protected doLogin(email: string, password: string, rememberMe: boolean) {
    return of(this.token);
  }

  protected doRefresh(refreshToken?: RefreshToken) {
    return of(this.token);
  }

  protected doLogout() {
    return of(true);
  }

  protected fetchProfile() {
    return of({
      id: 1,
      name: 'Zongbin',
      email: 'nzb329@163.com',
      avatar: './assets/images/avatar.jpg',
    });
  }

  protected fetchMenu() {
    return this.http
      .get<{ menu: Menu[] }>('assets/data/menu.json?_t=' + Date.now())
      .pipe(map(res => res.menu));
  }
}
