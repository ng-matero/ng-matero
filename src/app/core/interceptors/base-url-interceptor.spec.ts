import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BASE_URL, baseUrlInterceptor } from './base-url-interceptor';

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
      providers: [
        { provide: BASE_URL, useValue: null },
        provideHttpClient(withInterceptors([baseUrlInterceptor])),
        provideHttpClientTesting(),
      ],
    });
  });

  afterEach(() => httpMock.verify());

  it('should not prepend base url when base url is empty', () => {
    setBaseUrl(null);

    http.get('/user').subscribe(data => expect(data).toEqual({ success: true }));

    httpMock.expectOne('/user').flush({ success: true });
  });

  it('should prepend base url when request url does not has http scheme', () => {
    setBaseUrl(baseUrl);

    http.get('./user').subscribe(data => expect(data).toEqual({ success: true }));
    httpMock.expectOne(baseUrl + '/user').flush({ success: true });

    http.get('').subscribe(data => expect(data).toEqual({ success: true }));
    httpMock.expectOne(baseUrl).flush({ success: true });
  });
});
