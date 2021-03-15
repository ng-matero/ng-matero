import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { STATUS } from 'angular-in-memory-web-api';
import { LocalStorageService, MemoryStorageService } from '../../shared/services/storage.service';
import { TokenService } from '../authentication/token.service';
import { BASE_URL } from './base-url.interceptor';

describe('TokenInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  const baseUrl = 'http://foo.bar';

  const setBaseUrlAndToken = (url: string, accessToken: string) => {
    TestBed.overrideProvider(BASE_URL, { useValue: url });
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);

    return TestBed.inject(TokenService).set({ access_token: accessToken });
  };

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
    setBaseUrlAndToken('', 'token');
    const url = '/me';

    http.get(url).subscribe();

    expect(httpMock.expectOne(url).request.headers.has('Authorization')).toBeTrue();
  });

  it('should append token when url does not has http and base url not empty', () => {
    setBaseUrlAndToken(baseUrl, 'token');
    const url = '/me';

    http.get(url).subscribe();

    expect(httpMock.expectOne(url).request.headers.has('Authorization')).toBeTrue();
  });

  it('should append token when url include base url', () => {
    setBaseUrlAndToken(baseUrl, 'token');
    const url = `${baseUrl}/me`;

    http.get(url).subscribe();

    expect(httpMock.expectOne(url).request.headers.has('Authorization')).toBeTrue();
  });

  it('should not append token when url not include baseUrl', () => {
    setBaseUrlAndToken(baseUrl, 'token');
    const url = 'https://api.github.com';

    http.get(url).subscribe();

    expect(httpMock.expectOne(url).request.headers.has('Authorization')).toBeFalse();
  });

  it('should not append token when base url is empty and url is not same site', () => {
    setBaseUrlAndToken('', 'token');
    const url = 'https://api.github.com';

    http.get(url).subscribe();

    expect(httpMock.expectOne(url).request.headers.has('Authorization')).toBeFalse();
  });

  it('should clear token when response status is unauthorized', () => {
    const token = setBaseUrlAndToken('', 'token');
    const url = '/me';
    spyOn(token, 'clear');

    http.get(url).subscribe();

    httpMock.expectOne(url).flush(
      {},
      {
        status: STATUS.UNAUTHORIZED,
        statusText: 'Unauthorized',
      }
    );
    expect(token.clear).toHaveBeenCalled();
  });
});
