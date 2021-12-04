import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService, Menu, RefreshToken } from '@core';

/**
 * You should delete this file in the real APP.
 */
@Injectable()
export class FakeLoginService extends LoginService {
  private token = { access_token: 'MW56YjMyOUAxNjMuY29tWm9uZ2Jpbg==', token_type: 'bearer' };

  login(email: string, password: string, rememberMe: boolean) {
    return of(this.token);
  }

  refresh(refreshToken?: RefreshToken) {
    return of(this.token);
  }

  logout() {
    return of(true);
  }

  me() {
    return of({
      id: 1,
      name: 'Zongbin',
      email: 'nzb329@163.com',
      avatar: './assets/images/avatar.jpg',
    });
  }

  menu() {
    return this.http
      .get<{ menu: Menu[] }>('assets/data/menu.json?_t=' + Date.now())
      .pipe(map(res => res.menu));
  }
}
