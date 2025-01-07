import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SettingsService } from '@core/bootstrap/settings.service';
import { provideTranslateService } from '@ngx-translate/core';
import { SettingsInterceptor } from './settings-interceptor';

describe('SettingsInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let settings: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: SettingsInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideTranslateService(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    settings = TestBed.inject(SettingsService);
  });

  it('should set accept language', () => {
    settings.setLanguage('zh-TW');

    http.get('/user').subscribe();
    const testRequest = httpMock.expectOne('/user');
    testRequest.flush({ me: true });

    expect(testRequest.request.headers.get('Accept-Language')).toEqual('zh-TW');
  });
});
