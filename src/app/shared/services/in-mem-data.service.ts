import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { InMemoryDbService, RequestInfo, STATUS } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { User } from '@core/authentication/interface';

@Injectable({
  providedIn: 'root',
})
export class InMemDataService implements InMemoryDbService {
  private users: User[] = [{
    id: 1,
    username: 'ng-matero',
    password: 'ng-matero',
    name: 'Zongbin',
    email: 'nzb329@163.com',
    avatar: './assets/images/avatar.jpg',
  }, {
    id: 2,
    username: 'recca0120',
    password: 'password',
    name: 'recca0120',
    email: 'recca0120@gmail.com',
    avatar: './assets/images/avatars/avatar-10.jpg',
  }];

  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    return { users: this.users };
  }

  get(reqInfo: RequestInfo) {
    if (reqInfo.apiBase === 'me/') {
      return reqInfo.utils.createResponse$(() => {
        const { headers, url } = reqInfo;
        const req = reqInfo.req as HttpRequest<any>;
        const authorization = (req.headers.get('Authorization'));
        const [, token] = authorization.split(' ');
        const currentUser = this.users.find(user => this.generateToken(user) === token);
        delete currentUser.password;

        return {
          status: STATUS.OK,
          headers,
          url,
          body: currentUser,
        };
      });
    }
  }

  post(reqInfo: RequestInfo) {
    if (reqInfo.apiBase === 'auth/') {
      const lookup = { login: this.login, logout: this.logout };

      if (reqInfo.collectionName in lookup) {
        return lookup[reqInfo.collectionName].call(this, reqInfo);
      }
    }
  }

  private login(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const { headers, url } = reqInfo;
      const req = reqInfo.req as HttpRequest<any>;
      const { email, password } = req.body;
      const currentUser = this.users.find(user => user.email === email || user.username === email);

      if (!currentUser) {
        return { status: STATUS.UNAUTHORIZED, headers, url, body: {} };
      }

      if (currentUser.password !== password) {
        return {
          status: STATUS.UNPROCESSABLE_ENTRY,
          headers,
          url,
          body: {
            errors: {
              password: ['The provided password is incorrect.'],
            },
          },
        };
      }

      return {
        status: STATUS.OK,
        headers,
        url,
        body: {
          access_token: this.generateToken(currentUser),
          token_type: 'bearer',
          expires_in: 3600,
        },
      };
    });
  }

  private logout(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const { headers, url } = reqInfo;

      return { status: STATUS.OK, headers, url, body: {} };
    });
  }

  private generateToken(user: User) {
    return btoa([user.id, user.email, user.name].join(''));
  }
}
