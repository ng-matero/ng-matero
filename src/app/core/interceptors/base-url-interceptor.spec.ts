import { TestBed } from '@angular/core/testing';

import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BASE_URL, BaseUrlInterceptor } from './base-url-interceptor';

describe('BaseUrlInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  const baseUrl = 'https://foo.bar';

  const setBaseUrl = (url: string | null) => {
    TestBed.overrideProvider(BASE_URL, { useValue: url });
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: BASE_URL, useValue: null },
        { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
      ],
    });
  });

  afterEach(() => httpMock.verify());

  it('should not prepend base url when base url is empty', () => {
    setBaseUrl(null);

    http.get('/me').subscribe(data => expect(data).toEqual({ success: true }));

    httpMock.expectOne('/me').flush({ success: true });
  });

  it('should prepend base url when request url does not has http scheme', () => {
    setBaseUrl(baseUrl);

    http.get('./me').subscribe(data => expect(data).toEqual({ success: true }));
    httpMock.expectOne(baseUrl + '/me').flush({ success: true });

    http.get('').subscribe(data => expect(data).toEqual({ success: true }));
    httpMock.expectOne(baseUrl).flush({ success: true });
  });
});
