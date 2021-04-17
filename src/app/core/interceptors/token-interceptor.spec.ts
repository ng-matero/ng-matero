import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token-interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { STATUS } from 'angular-in-memory-web-api';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LocalStorageService, MemoryStorageService } from '../../shared/services/storage.service';
import { TokenService } from '../authentication/token.service';
import { BASE_URL } from './base-url-interceptor';

describe('TokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let router: Router;
  const baseUrl = 'https://foo.bar';
  const emptyFn = () => {};

  const setBaseUrlAndToken = (url: string, accessToken: string) => {
    TestBed.overrideProvider(BASE_URL, { useValue: url });
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);

    return TestBed.inject(TokenService).set({ access_token: accessToken });
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: LocalStorageService, useClass: MemoryStorageService },
        { provide: BASE_URL, useValue: baseUrl },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      ],
    });
  });

  afterEach(() => httpMock.verify());

  it('should append token when url does not has http scheme', () => {
    setBaseUrlAndToken('', 'token');
    const url = '/me';

    http.get(url).subscribe(emptyFn, emptyFn, emptyFn);

    const testRequest = httpMock.expectOne(url);
    testRequest.flush({ success: true });
    expect(testRequest.request.headers.has('Authorization')).toBeTrue();
  });

  it('should append token when url does not has http and base url not empty', () => {
    setBaseUrlAndToken(baseUrl, 'token');
    const url = '/me';

    http.get(url).subscribe(emptyFn, emptyFn, emptyFn);

    const testRequest = httpMock.expectOne(url);
    testRequest.flush({ success: true });
    expect(testRequest.request.headers.has('Authorization')).toBeTrue();
  });

  it('should append token when url include base url', () => {
    setBaseUrlAndToken(baseUrl, 'token');
    const url = `${baseUrl}/me`;

    http.get(url).subscribe(emptyFn, emptyFn, emptyFn);

    const testRequest = httpMock.expectOne(url);
    testRequest.flush({ success: true });
    expect(testRequest.request.headers.has('Authorization')).toBeTrue();
  });

  it('should not append token when url not include baseUrl', () => {
    setBaseUrlAndToken(baseUrl, 'token');
    const url = 'https://api.github.com';

    http.get(url).subscribe(emptyFn, emptyFn, emptyFn);

    const testRequest = httpMock.expectOne(url);
    testRequest.flush({ success: true });
    expect(testRequest.request.headers.has('Authorization')).toBeFalse();
  });

  it('should not append token when base url is empty and url is not same site', () => {
    setBaseUrlAndToken('', 'token');
    const url = 'https://api.github.com';

    http.get(url).subscribe(emptyFn, emptyFn, emptyFn);

    const testRequest = httpMock.expectOne(url);
    testRequest.flush({ success: true });
    expect(testRequest.request.headers.has('Authorization')).toBeFalse();
  });

  it('should clear token when response status is unauthorized', () => {
    const token = setBaseUrlAndToken('', 'token');
    const url = '/me';
    spyOn(token, 'clear');

    http.get(url).subscribe(emptyFn, emptyFn, emptyFn);

    httpMock
      .expectOne(url)
      .flush({ success: true }, { status: STATUS.UNAUTHORIZED, statusText: 'Unauthorized' });

    expect(token.clear).toHaveBeenCalled();
  });

  it('should navigate /auth/login when api url is /auth/logout and token is valid', () => {
    setBaseUrlAndToken('', 'token');
    const url = '/auth/logout';
    spyOn(router, 'navigateByUrl');

    http.post(url, {}).subscribe(emptyFn, emptyFn, emptyFn);
    httpMock.expectOne(url);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/login');
  });

  it('should navigate /auth/login when api url is /auth/logout and token is invalid', () => {
    setBaseUrlAndToken('', '');
    const url = '/auth/logout';
    spyOn(router, 'navigateByUrl');

    http.post(url, {}).subscribe(emptyFn, emptyFn, emptyFn);

    httpMock.expectOne(url);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/login');
  });
});
