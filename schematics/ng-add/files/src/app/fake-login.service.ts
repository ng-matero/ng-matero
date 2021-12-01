import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { LoginService, Menu } from '@core';
import { map } from 'rxjs/operators';

/**
 * You should delete this file in the real APP.
 */
@Injectable()
export class FakeLoginService extends LoginService {
  private user = {
    id: 1,
    name: 'Zongbin',
    email: 'nzb329@163.com',
    avatar: './assets/images/avatar.jpg',
  };

  private token = { access_token: 'MW56YjMyOUAxNjMuY29tWm9uZ2Jpbg==', token_type: 'bearer' };

  login() {
    return of(this.token);
  }

  refresh() {
    return of(this.token);
  }

  logout() {
    return of({});
  }

  me() {
    return of(this.user);
  }

  menu() {
    return this.http
      .get<{ menu: Menu[] }>('assets/data/menu.json?_t=' + Date.now())
      .pipe(map(res => res.menu));
  }
}
