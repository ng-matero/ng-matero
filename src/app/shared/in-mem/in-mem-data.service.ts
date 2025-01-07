import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { InMemoryDbService, RequestInfo, STATUS } from 'angular-in-memory-web-api';
import { from, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { find, map, switchMap } from 'rxjs/operators';
import { environment } from '@env/environment';
import { base64, currentTimestamp, filterObject, User } from '@core/authentication';

class JWT {
  generate(user: User) {
    const expiresIn = 3600;
    const refreshTokenExpiresIn = 86400;

    return filterObject({
      access_token: this.createToken(user, expiresIn),
      token_type: 'bearer',
      expires_in: user.refresh_token ? expiresIn : undefined,
      refresh_token: user.refresh_token ? this.createToken(user, refreshTokenExpiresIn) : undefined,
    });
  }

  getUser(req: HttpRequest<any>) {
    let token = '';

    if (req.body?.refresh_token) {
      token = req.body.refresh_token;
    } else if (req.headers.has('Authorization')) {
      const authorization = req.headers.get('Authorization');
      const result = (authorization as string).split(' ');
      token = result[1];
    }

    try {
      const now = new Date();
      const data = JWT.parseToken(token);

      return JWT.isExpired(data, now) ? null : data.user;
    } catch (e) {
      return null;
    }
  }

  createToken(user: User, expiresIn = 0) {
    const exp = user.refresh_token ? currentTimestamp() + expiresIn : undefined;

    return [
      base64.encode(JSON.stringify({ typ: 'JWT', alg: 'HS256' })),
      base64.encode(JSON.stringify(filterObject(Object.assign({ exp, user })))),
      base64.encode('ng-matero'),
    ].join('.');
  }

  private static parseToken(accessToken: string) {
    const [, payload] = accessToken.split('.');

    return JSON.parse(base64.decode(payload));
  }

  private static isExpired(data: any, now: Date) {
    const expiresIn = new Date();
    expiresIn.setTime(data.exp * 1000);
    const diff = this.dateToSeconds(expiresIn) - this.dateToSeconds(now);

    return diff <= 0;
  }

  private static dateToSeconds(date: Date) {
    return Math.ceil(date.getTime() / 1000);
  }
}

const jwt = new JWT();

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
      avatar: 'images/avatar.jpg',
    },
    {
      id: 2,
      username: 'recca0120',
      password: 'password',
      name: 'recca0120',
      email: 'recca0120@gmail.com',
      avatar: 'images/heros/10.jpg',
      refresh_token: true,
    },
  ];

  createDb(
    reqInfo?: RequestInfo
  ):
    | Record<string, unknown>
    | Observable<Record<string, unknown>>
    | Promise<Record<string, unknown>> {
    return { users: this.users };
  }

  get(reqInfo: RequestInfo) {
    const { headers, url } = reqInfo;

    if (is(reqInfo, 'user/menu')) {
      return ajax('data/menu.json?_t=' + Date.now()).pipe(
        map((response: any) => {
          return { headers, url, status: STATUS.OK, body: { menu: response.response.menu } };
        }),
        switchMap(response => reqInfo.utils.createResponse$(() => response))
      );
    }

    if (is(reqInfo, 'user')) {
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
    const { username, password } = req.body;

    return from(this.users).pipe(
      find(user => user.username === username || user.email === username),
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
      switchMap(response => reqInfo.utils.createResponse$(() => response))
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
