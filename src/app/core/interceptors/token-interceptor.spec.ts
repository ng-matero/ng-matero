import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token-interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { STATUS } from 'angular-in-memory-web-api';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LocalStorageService, MemoryStorageService } from '@shared/services/storage.service';
import { TokenService, User } from '@core/authentication';
import { BASE_URL } from './base-url-interceptor';

describe('TokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let router: Router;
  let tokenService: TokenService;
  const emptyFn = () => {};
  const baseUrl = 'https://foo.bar';
  const user: User = { id: 1, email: 'foo@bar.com' };

  function init(url: string, access_token: string) {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: LocalStorageService, useClass: MemoryStorageService },
        { provide: BASE_URL, useValue: url },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);
    tokenService = TestBed.inject(TokenService).set({ access_token, token_type: 'bearer' });
  }

  function mockRequest(url: string, body?: any, headers?: any) {
    http.get(url).subscribe(emptyFn, emptyFn, emptyFn);
    const testRequest = httpMock.expectOne(url);
    testRequest.flush(body ?? {}, headers ?? {});

    return testRequest;
  }

  afterEach(() => httpMock.verify());

  it('should append token when url does not has http scheme', () => {
    init('', 'token');

    const headers = mockRequest('/me', user).request.headers;

    expect(headers.get('Authorization')).toEqual('Bearer token');
  });

  it('should append token when url does not has http and base url not empty', () => {
    init(baseUrl, 'token');

    const headers = mockRequest('/me', user).request.headers;

    expect(headers.get('Authorization')).toEqual('Bearer token');
  });

  it('should append token when url include base url', () => {
    init(baseUrl, 'token');

    const headers = mockRequest(`${baseUrl}/me`, user).request.headers;

    expect(headers.get('Authorization')).toEqual('Bearer token');
  });

  it('should not append token when url not include baseUrl', () => {
    init(baseUrl, 'token');

    const headers = mockRequest('https://api.github.com', { success: true }).request.headers;

    expect(headers.has('Authorization')).toBeFalse();
  });

  it('should not append token when base url is empty and url is not same site', () => {
    init('', 'token');

    const headers = mockRequest('https://api.github.com', { success: true }).request.headers;

    expect(headers.has('Authorization')).toBeFalse();
  });

  it('should clear token when response status is unauthorized', () => {
    init('', 'token');
    spyOn(tokenService, 'clear');

    mockRequest('/me', {}, { status: STATUS.UNAUTHORIZED, statusText: 'Unauthorized' });

    expect(tokenService.clear).toHaveBeenCalled();
  });

  it('should navigate /auth/login when api url is /auth/logout and token is valid', () => {
    init('', 'token');
    const navigateByUrl = spyOn(router, 'navigateByUrl');
    navigateByUrl.and.returnValue(Promise.resolve(true));

    mockRequest('/auth/logout');

    expect(navigateByUrl).toHaveBeenCalledWith('/auth/login');
  });

  it('should navigate /auth/login when api url is /auth/logout and token is invalid', () => {
    init('', '');
    const navigateByUrl = spyOn(router, 'navigateByUrl');
    navigateByUrl.and.returnValue(Promise.resolve(true));

    mockRequest('/auth/logout');

    expect(navigateByUrl).toHaveBeenCalledWith('/auth/login');
  });
});
