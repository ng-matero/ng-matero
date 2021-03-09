import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { InMemoryDbService, RequestInfo, STATUS } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InMemDataService implements InMemoryDbService {
  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    return {};
  }

  get(reqInfo: RequestInfo) {
    if (reqInfo.apiBase === 'me/') {
      return reqInfo.utils.createResponse$(() => {
        return {
          status: STATUS.OK,
          body: {
            id: 1,
            username: 'ng-matero',
            name: 'Zongbin',
            email: 'nzb329@163.com',
            avatar: './assets/images/avatar.jpg',
          },
        };
      });
    }
  }

  post(reqInfo: RequestInfo) {
    if (reqInfo.apiBase === 'auth/') {
      return this.authenticate(reqInfo);
    }
    if (reqInfo.apiBase === 'logout/') {
      return reqInfo.utils.createResponse$(() => {
        const { headers, url } = reqInfo;

        return { status: STATUS.OK, headers, url, body: {} };
      });
    }
  }

  private authenticate(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const { headers, url } = reqInfo;
      const req = reqInfo.req as HttpRequest<any>;
      const { email, password } = req.body;

      if (email === 'ng-matero' && password === 'ng-matero') {
        return {
          status: STATUS.OK,
          headers,
          url,
          body: {
            access_token: 'ng-matero-token',
            token_type: 'bearer',
            expires_in: 3600,
          },
        };
      }

      return { status: STATUS.UNAUTHORIZED, headers, url, body: {} };
    });
  }
}
