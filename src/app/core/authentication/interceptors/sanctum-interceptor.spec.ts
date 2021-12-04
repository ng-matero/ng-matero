import { TestBed } from '@angular/core/testing';

import { InjectionToken } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import {
  AuthModule,
  SANCTUM_BASE_URL,
  SANCTUM_PREFIX,
  SanctumInterceptor,
  SanctumService,
} from '..';

describe('SanctumInterceptor', () => {
  const BASE_URL = new InjectionToken<string>('BASE_URL');
  let httpMock: HttpTestingController;
  let http: HttpClient;

  const setBaseUrlAndSanctumPrefix = (baseUrl: string | null, sanctumPrefix: string | null) => {
    TestBed.overrideProvider(BASE_URL, { useValue: baseUrl });
    TestBed.overrideProvider(SANCTUM_PREFIX, { useValue: sanctumPrefix });

    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: BASE_URL, useValue: null },
        { provide: SANCTUM_BASE_URL, useExisting: BASE_URL },
        { provide: SANCTUM_PREFIX, useValue: null },
        { provide: HTTP_INTERCEPTORS, useClass: SanctumInterceptor, multi: true },
        SanctumService,
      ],
    });
  });

  afterEach(() => httpMock.verify());

  it('should get csrf cookie once', () => {
    setBaseUrlAndSanctumPrefix(null, null);

    http
      .post('/auth/login', {
        username: 'foo',
        password: 'bar',
      })
      .pipe(switchMap(() => http.get('/me')))
      .subscribe(data => expect(data).toEqual({ me: true }));

    httpMock.expectOne('/sanctum/csrf-cookie').flush({ cookie: true });
    httpMock.expectOne('/auth/login').flush({ login: true });
    httpMock.expectOne('/me').flush({ me: true });
  });

  it('should get csrf cookie with base url', () => {
    setBaseUrlAndSanctumPrefix('https://foo.bar/api', null);

    http
      .post('/auth/login', {
        username: 'foo',
        password: 'bar',
      })
      .pipe(switchMap(() => http.get('/me')))
      .subscribe(data => expect(data).toEqual({ me: true }));

    httpMock.expectOne('https://foo.bar/sanctum/csrf-cookie').flush({ cookie: true });
    httpMock.expectOne('/auth/login').flush({ login: true });
    httpMock.expectOne('/me').flush({ me: true });
  });

  it('should get csrf cookie with sanctum prefix', () => {
    setBaseUrlAndSanctumPrefix(null, 'foobar');

    http
      .post('/auth/login', {
        username: 'foo',
        password: 'bar',
      })
      .pipe(switchMap(() => http.get('/me')))
      .subscribe(data => expect(data).toEqual({ me: true }));

    httpMock.expectOne('/foobar/csrf-cookie').flush({ cookie: true });
    httpMock.expectOne('/auth/login').flush({ login: true });
    httpMock.expectOne('/me').flush({ me: true });
  });

  it('should get csrf cookie with base url and sanctum prefix', () => {
    setBaseUrlAndSanctumPrefix('https://foo.bar/api', 'foobar');

    http
      .post('/auth/login', {
        username: 'foo',
        password: 'bar',
      })
      .pipe(switchMap(() => http.get('/me')))
      .subscribe(data => expect(data).toEqual({ me: true }));

    httpMock.expectOne('https://foo.bar/foobar/csrf-cookie').flush({ cookie: true });
    httpMock.expectOne('/auth/login').flush({ login: true });
    httpMock.expectOne('/me').flush({ me: true });
  });
});
