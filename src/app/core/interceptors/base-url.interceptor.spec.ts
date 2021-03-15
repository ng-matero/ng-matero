import { TestBed } from '@angular/core/testing';

import { BASE_URL, BaseUrlInterceptor } from './base-url.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BaseUrlInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  const baseUrl = 'https://foo.bar';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: BASE_URL, useValue: baseUrl },
        { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
      ],
    });

  });

  afterEach(() => httpMock.verify());

  it('should not prepend base url when base url is empty', () => {
    TestBed.overrideProvider(BASE_URL, { useValue: '' });
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);

    http.get('/me').subscribe();

    httpMock.expectOne('/me');
  });


  it('should prepend base url when request url does not has http scheme', () => {
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);

    http.get('./me').subscribe();

    httpMock.expectOne(baseUrl + '/me');
  });

  it('should prepend base url when request url does not has http scheme', () => {
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);

    http.get('').subscribe();

    httpMock.expectOne(baseUrl);
  });
});
