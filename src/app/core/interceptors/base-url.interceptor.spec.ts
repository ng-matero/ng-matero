import { TestBed } from '@angular/core/testing';

import { BaseUrlInterceptor } from './base-url.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '@env/environment';

describe('BaseUrlInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => httpMock.verify());

  it('should not prepend base url when base url is empty', () => {
    environment.baseUrl = '';

    http.get('/me').subscribe();

    httpMock.expectOne('/me');
  });


  it('should prepend base url when request url does not has http scheme', () => {
    environment.baseUrl = 'https://foo.bar/';

    http.get('./me').subscribe();

    httpMock.expectOne(environment.baseUrl + 'me');
  });

  it('should prepend base url when request url does not has http scheme', () => {
    environment.baseUrl = 'https://foo.bar';

    http.get('').subscribe();

    httpMock.expectOne(environment.baseUrl);
  });
});
