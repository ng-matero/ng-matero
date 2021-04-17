import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { InMemoryDbService, RequestInfo, STATUS } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { User } from '@core/authentication/interface';
import { environment } from '@env/environment';

function urlSafeBase64Encode(text: string) {
  return btoa(text).replace(/[+/=]/g, m => {
    return { '+': '-', '/': '_', '=': '' }[m];
  });
}

function urlSafeBase64Decode(text: string) {
  return atob(
    text.replace(/[-_]/g, m => {
      return { '-': '+', '_': '/' }[m];
    })
  );
}

function generateToken(user: User) {
  const expiresIn = 3600;
  const header = JSON.stringify({ typ: 'JWT', alg: 'HS256' });
  const payload = JSON.stringify({ exp: Math.ceil(new Date().getTime() / 1000) + expiresIn, user });
  const key = 'ng-matero';

  const accessToken = [
    urlSafeBase64Encode(header),
    urlSafeBase64Encode(payload),
    urlSafeBase64Encode(key),
  ].join('.');

  return {
    access_token: accessToken,
    token_type: 'bearer',
    expires_in: expiresIn,
  };
}

function is(reqInfo: RequestInfo, path: string) {
  if (environment.baseUrl) {
    return false;
  }

  return new RegExp(`${path}(/)?$`, 'i').test(reqInfo.req.url);
}

function getUserFromJWTToken(req: HttpRequest<any>) {
  const authorization = req.headers.get('Authorization');
  const [, token] = authorization.split(' ');
  try {
    const [, payload] = token.split('.');

    const data = JSON.parse(urlSafeBase64Decode(payload));
    const d = new Date();
    d.setUTCSeconds(data.exp);
    if (new Date().getTime() > d.getTime()) {
      return null;
    }

    return data.user;
  } catch (e) {
    return null;
  }
}

@Injectable({
  providedIn: 'root',
})
export class InMemDataService implements InMemoryDbService {
  private users: User[] = [
    {
      id: 1,
      username: 'ng-matero',
      password: 'ng-matero',
      name: 'Zongbin',
      email: 'nzb329@163.com',
      avatar: './assets/images/avatar.jpg',
    },
    {
      id: 2,
      username: 'recca0120',
      password: 'password',
      name: 'recca0120',
      email: 'recca0120@gmail.com',
      avatar: './assets/images/avatars/avatar-10.jpg',
    },
  ];

  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    return { users: this.users };
  }

  get(reqInfo: RequestInfo) {
    if (is(reqInfo, 'sanctum/csrf-cookie')) {
      return reqInfo.utils.createResponse$(() => {
        const { headers, url } = reqInfo;

        return { status: STATUS.NO_CONTENT, headers, url, body: {} };
      });
    }

    if (is(reqInfo, 'me/menu')) {
      return reqInfo.utils.createResponse$(() => {
        const { headers, url } = reqInfo;
        const menu = JSON.parse(this.fetch('assets/data/menu.json?_t=' + Date.now())).menu;

        return { status: STATUS.OK, headers, url, body: { menu } };
      });
    }

    if (is(reqInfo, 'me')) {
      return reqInfo.utils.createResponse$(() => {
        const { headers, url } = reqInfo;
        const user = getUserFromJWTToken(reqInfo.req as HttpRequest<any>);

        if (!user) {
          return { status: STATUS.UNAUTHORIZED, headers, url, body: {} };
        }

        return { status: STATUS.OK, headers, url, body: user };
      });
    }
  }

  post(reqInfo: RequestInfo) {
    if (is(reqInfo, 'auth/login')) {
      return this.login(reqInfo);
    }

    if (is(reqInfo, 'auth/refresh')) {
      return this.refresh(reqInfo);
    }

    if (is(reqInfo, 'auth/logout')) {
      return this.logout(reqInfo);
    }
  }

  private login(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const { headers, url } = reqInfo;
      const req = reqInfo.req as HttpRequest<any>;
      const { email, password } = req.body;
      const currentUser = Object.assign(
        {},
        this.users.find(user => user.email === email || user.username === email)
      );

      if (!currentUser) {
        return { status: STATUS.UNAUTHORIZED, headers, url, body: {} };
      }

      if (currentUser.password !== password) {
        return {
          status: STATUS.UNPROCESSABLE_ENTRY,
          headers,
          url,
          error: {
            errors: {
              password: ['The provided password is incorrect.'],
            },
          },
        };
      }

      delete currentUser.password;

      return { status: STATUS.OK, headers, url, body: generateToken(currentUser) };
    });
  }

  private refresh(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const { headers, url } = reqInfo;
      const user = getUserFromJWTToken(reqInfo.req as HttpRequest<any>);
      if (!user) {
        return { status: STATUS.UNAUTHORIZED, headers, url, body: {} };
      }

      return { status: STATUS.OK, headers, url, body: generateToken(user) };
    });
  }

  private logout(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const { headers, url } = reqInfo;

      return { status: STATUS.OK, headers, url, body: {} };
    });
  }

  private fetch(url: string) {
    let content: any = null;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.onload = () => (content = xhr.responseText);
    xhr.send();

    return content;
  }
}
