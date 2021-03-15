import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TokenService } from '@core';
import { environment } from '@env/environment';
import { LocalStorageService, MemoryStorageService } from '@shared';
import { STATUS } from 'angular-in-memory-web-api';
import { BASE_URL } from '@core/interceptors/base-url.interceptor';

describe('TokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let token: TokenService;
  const baseUrl = 'http://foo.bar';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: LocalStorageService, useClass: MemoryStorageService },
        { provide: BASE_URL, useValue: baseUrl },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      ],
    });
  });

  afterEach(() => httpMock.verify());

  it('should append token when url does not has http scheme', () => {
    TestBed.overrideProvider(BASE_URL, { useValue: '' });
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    token = TestBed.inject(TokenService);
    token.set({ access_token: 'token' });
    const url = '/me';

    http.get(url).subscribe();

    expect(httpMock.expectOne(url).request.headers.has('Authorization')).toBeTrue();
  });

  it('should append token when url does not has http and environment.SERVER_ORIGIN not empty', () => {
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    token = TestBed.inject(TokenService);
    token.set({ access_token: 'token' });
    const url = '/me';

    http.get(url).subscribe();

    expect(httpMock.expectOne(url).request.headers.has('Authorization')).toBeTrue();
  });

  it('should append token when url include environment.baseUrl', () => {
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    token = TestBed.inject(TokenService);
    token.set({ access_token: 'token' });
    const url = `${environment.baseUrl}/me`;

    http.get(url).subscribe();

    expect(httpMock.expectOne(url).request.headers.has('Authorization')).toBeTrue();
  });

  it('should not append token when url not include baseUrl', () => {
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    token = TestBed.inject(TokenService);
    token.set({ access_token: 'token' });
    const url = 'https://api.github.com';

    http.get(url).subscribe();

    expect(httpMock.expectOne(url).request.headers.has('Authorization')).toBeFalse();
  });

  it('should not append token when environment.baseUrl is empty and url is not same site', () => {
    TestBed.overrideProvider(BASE_URL, { useValue: '' });
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    token = TestBed.inject(TokenService);
    token.set({ access_token: 'token' });
    const url = 'https://api.github.com';

    http.get(url).subscribe();

    expect(httpMock.expectOne(url).request.headers.has('Authorization')).toBeFalse();
  });

  it('should clear token when response status is unauthorized', () => {
    TestBed.overrideProvider(BASE_URL, { useValue: '' });
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    token = TestBed.inject(TokenService);
    token.set({ access_token: 'token' });
    const url = '/me';
    spyOn(token, 'clear');

    http.get(url).subscribe();

    httpMock.expectOne(url).flush({}, {
      status: STATUS.UNAUTHORIZED,
      statusText: 'Unauthorized',
    });
    expect(token.clear).toHaveBeenCalled();
  });
});
