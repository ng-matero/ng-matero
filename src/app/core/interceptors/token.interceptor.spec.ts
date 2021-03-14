import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TokenService } from '@core';
import { environment } from '@env/environment';
import { LocalStorageService, MemoryStorageService } from '@shared';
import { STATUS } from 'angular-in-memory-web-api';

describe('TokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let token: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: LocalStorageService, useClass: MemoryStorageService },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    token = TestBed.inject(TokenService);
  });

  afterEach(() => httpMock.verify());

  it('should append token when url does not has http scheme', () => {
    environment.SERVER_ORIGIN = '';
    const url = '/me';
    token.set({ access_token: 'token' });

    http.get(url).subscribe();

    expect(httpMock.expectOne(url).request.headers.has('Authorization')).toBeTrue();
  });

  it('should append token when url does not has http and environment.SERVER_ORIGIN not empty', () => {
    environment.SERVER_ORIGIN = 'http://foo.bar';
    const url = '/me';
    token.set({ access_token: 'token' });

    http.get(url).subscribe();

    expect(httpMock.expectOne(url).request.headers.has('Authorization')).toBeTrue();
  });

  it('should append token when url include environment.SERVER_ORIGIN', () => {
    environment.SERVER_ORIGIN = 'http://foo.bar';
    const url = `${environment.SERVER_ORIGIN}/me`;
    token.set({ access_token: 'token' });

    http.get(url).subscribe();

    expect(httpMock.expectOne(url).request.headers.has('Authorization')).toBeTrue();
  });

  it('should not append token when url not include environment.SERVER_ORIGIN', () => {
    environment.SERVER_ORIGIN = 'http://foo.bar';
    const url = 'https://api.github.com';
    token.set({ access_token: 'token' });

    http.get(url).subscribe();

    expect(httpMock.expectOne(url).request.headers.has('Authorization')).toBeFalse();
  });

  it('should not append token when environment.SERVER_ORIGIN is empty and url is not same site', () => {
    environment.SERVER_ORIGIN = '';
    const url = 'https://api.github.com';
    token.set({ access_token: 'token' });

    http.get(url).subscribe();

    expect(httpMock.expectOne(url).request.headers.has('Authorization')).toBeFalse();
  });

  it('should clear token when response status is unauthorized', () => {
    const url = '/me';
    token.set({ access_token: 'token' });
    spyOn(token, 'clear');

    http.get(url).subscribe();

    httpMock.expectOne(url).flush({}, {
      status: STATUS.UNAUTHORIZED,
      statusText: 'Unauthorized',
    });
    expect(token.clear).toHaveBeenCalled();
  });
});
