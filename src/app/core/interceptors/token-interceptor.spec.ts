import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token-interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { STATUS } from 'angular-in-memory-web-api';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LocalStorageService, MemoryStorageService } from '@shared/services/storage.service';
import { TokenService } from '@core/authentication';
import { BASE_URL } from './base-url-interceptor';

describe('TokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let router: Router;
  const baseUrl = 'https://foo.bar';

  function overrideBaseUrl(url: string) {
    TestBed.overrideProvider(BASE_URL, { useValue: url });
  }

  function getTokenService(accessToken: string) {
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);

    const tokenService = TestBed.inject(TokenService);
    tokenService.set({ access_token: accessToken });

    return tokenService;
  }

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
    const url = '/me';
    overrideBaseUrl(url);
    getTokenService('token');

    http.get(url).subscribe();

    const testRequest = httpMock.expectOne(url);
    testRequest.flush({ success: true });
    expect(testRequest.request.headers.has('Authorization')).toBeTrue();
  });

  it('should append token when url does not has http and base url not empty', () => {
    const url = '/me';
    getTokenService('token');

    http.get(url).subscribe();

    const testRequest = httpMock.expectOne(url);
    testRequest.flush({ success: true });
    expect(testRequest.request.headers.has('Authorization')).toBeTrue();
  });

  it('should append token when url include base url', () => {
    const url = `${baseUrl}/me`;
    getTokenService('token');

    http.get(url).subscribe();

    const testRequest = httpMock.expectOne(url);
    testRequest.flush({ success: true });
    expect(testRequest.request.headers.has('Authorization')).toBeTrue();
  });

  it('should not append token when url not include baseUrl', () => {
    const url = 'https://api.github.com';
    getTokenService('token');

    http.get(url).subscribe();

    const testRequest = httpMock.expectOne(url);
    testRequest.flush({ success: true });
    expect(testRequest.request.headers.has('Authorization')).toBeFalse();
  });

  it('should not append token when base url is empty and url is not same site', () => {
    const url = 'https://api.github.com';
    overrideBaseUrl('');
    getTokenService('token');

    http.get(url).subscribe();

    const testRequest = httpMock.expectOne(url);
    testRequest.flush({ success: true });
    expect(testRequest.request.headers.has('Authorization')).toBeFalse();
  });

  it('should clear token when response status is unauthorized', () => {
    const url = '/me';
    const tokenService = getTokenService('token');
    spyOn(tokenService, 'clear');

    http.get(url).subscribe();

    httpMock
      .expectOne(url)
      .flush({ success: true }, { status: STATUS.UNAUTHORIZED, statusText: 'Unauthorized' });

    expect(tokenService.clear).toHaveBeenCalled();
  });

  it('should navigate /auth/login when api url is /auth/logout and token is valid', () => {
    const url = '/auth/logout';
    getTokenService('token');
    spyOn(router, 'navigateByUrl');

    http.post(url, {}).subscribe();
    httpMock.expectOne(url);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/login');
  });

  it('should navigate /auth/login when api url is /auth/logout and token is invalid', () => {
    const url = '/auth/logout';
    getTokenService('');
    spyOn(router, 'navigateByUrl');

    http.post(url, {}).subscribe();

    httpMock.expectOne(url);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/login');
  });
});
