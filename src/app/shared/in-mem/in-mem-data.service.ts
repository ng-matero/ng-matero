import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { InMemoryDbService, RequestInfo, STATUS } from 'angular-in-memory-web-api';
import { from, Observable } from 'rxjs';
import { User } from '@core/authentication/interface';
import { environment } from '@env/environment';
import { fromByteArray, toByteArray } from 'base64-js';
import { find, map, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

function pack(str: string) {
  const bytes: any = [];
  for (let i = 0; i < str.length; i++) {
    bytes.push(...[str.charCodeAt(i)]);
  }

  return bytes;
}

function unpack(byteArray: any) {
  return String.fromCharCode(...byteArray);
}

const base64 = {
  encode(plainText: string) {
    return fromByteArray(pack(plainText)).replace(/[+/=]/g, m => {
      return { '+': '-', '/': '_', '=': '' }[m] as string;
    });
  },

  decode(b64: string) {
    b64 = b64.replace(/[-_]/g, m => {
      return { '-': '+', '_': '/' }[m] as string;
    });
    while (b64.length % 4) {
      b64 += '=';
    }

    return unpack(toByteArray(b64));
  },
};

const jwt = {
  generate(user: User) {
    const expiresIn = 3600;
    const exp = Math.ceil(new Date().getTime() / 1000) + expiresIn;
    const accessToken = [
      base64.encode(JSON.stringify({ typ: 'JWT', alg: 'HS256' })),
      base64.encode(JSON.stringify({ exp, user })),
      base64.encode('ng-matero'),
    ].join('.');

    return { access_token: accessToken, token_type: 'bearer', expires_in: expiresIn };
  },
  getUser(req: HttpRequest<any>) {
    const authorization = req.headers.get('Authorization');
    const [, token] = (authorization as string).split(' ');
    try {
      const [, payload] = token.split('.');
      const data = JSON.parse(base64.decode(payload));
      const d = new Date();
      d.setUTCSeconds(data.exp);

      return new Date().getTime() > d.getTime() ? null : data.user;
    } catch (e) {
      return null;
    }
  },
};

function is(reqInfo: RequestInfo, path: string) {
  if (environment.baseUrl) {
    return false;
  }

  return new RegExp(`${path}(/)?$`, 'i').test(reqInfo.req.url);
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
    const { headers, url } = reqInfo;

    if (is(reqInfo, 'sanctum/csrf-cookie')) {
      const response = { headers, url, status: STATUS.NO_CONTENT, body: {} };

      return reqInfo.utils.createResponse$(() => response);
    }

    if (is(reqInfo, 'me/menu')) {
      return ajax('assets/data/menu.json?_t=' + Date.now()).pipe(
        map(response => {
          return { headers, url, status: STATUS.OK, body: { menu: response.response.menu } };
        }),
        switchMap(response => reqInfo.utils.createResponse$(() => response))
      );
    }

    if (is(reqInfo, 'me')) {
      const user = jwt.getUser(reqInfo.req as HttpRequest<any>);
      const result = user
        ? { status: STATUS.OK, body: user }
        : { status: STATUS.UNAUTHORIZED, body: {} };
      const response = Object.assign({ headers, url }, result);

      return reqInfo.utils.createResponse$(() => response);
    }

    return;
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

    return;
  }

  private login(reqInfo: RequestInfo) {
    const { headers, url } = reqInfo;
    const req = reqInfo.req as HttpRequest<any>;
    const { email, password } = req.body;

    return from(this.users).pipe(
      find(user => user.email === email || user.username === email),
      map(user => {
        if (!user) {
          return { headers, url, status: STATUS.UNAUTHORIZED, body: {} };
        }

        if (user.password !== password) {
          const result = {
            status: STATUS.UNPROCESSABLE_ENTRY,
            error: { errors: { password: ['The provided password is incorrect.'] } },
          };

          return Object.assign({ headers, url }, result);
        }

        const currentUser = Object.assign({}, user);
        delete currentUser.password;

        return { headers, url, status: STATUS.OK, body: jwt.generate(currentUser) };
      }),
      switchMap(response => {
        return reqInfo.utils.createResponse$(() => response);
      })
    );
  }

  private refresh(reqInfo: RequestInfo) {
    const { headers, url } = reqInfo;
    const user = jwt.getUser(reqInfo.req as HttpRequest<any>);
    const result = user
      ? { status: STATUS.OK, body: jwt.generate(user) }
      : { status: STATUS.UNAUTHORIZED, body: {} };
    const response = Object.assign({ headers, url }, result);

    return reqInfo.utils.createResponse$(() => response);
  }

  private logout(reqInfo: RequestInfo) {
    const { headers, url } = reqInfo;
    const response = { headers, url, status: STATUS.OK, body: {} };

    return reqInfo.utils.createResponse$(() => response);
  }
}
