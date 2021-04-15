import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ErrorInterceptor } from './error-interceptor';

describe('ErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let router: Router;
  let toastr: ToastrService;
  const emptyFn = () => {};

  function assertStatus(status: number, statusText) {
    spyOn(router, 'navigateByUrl');

    http.get('/me').subscribe(emptyFn, emptyFn, emptyFn);

    httpMock.expectOne('/me').flush({ success: true }, { status, statusText });

    expect(router.navigateByUrl).toHaveBeenCalledWith(`/sessions/${status}`, {
      skipLocationChange: true,
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot()],
      providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
    });

    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);
    toastr = TestBed.inject(ToastrService);
  });

  afterEach(() => httpMock.verify());

  it('should handle status code 401', () => {
    spyOn(router, 'navigateByUrl');

    http.get('/me').subscribe(emptyFn, emptyFn, emptyFn);

    httpMock.expectOne('/me').flush({ success: true }, { status: 401, statusText: 'Unauthorized' });

    expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/login');
  });

  it('should handle status code 403', () => {
    assertStatus(403, 'Forbidden');
  });

  it('should handle status code 404', () => {
    assertStatus(404, 'Not Found');
  });

  it('should handle status code 500', () => {
    assertStatus(500, 'Internal Server Error');
  });

  it('should handle others status code', () => {
    spyOn(toastr, 'error');

    http.get('/me').subscribe(emptyFn, emptyFn, emptyFn);

    httpMock
      .expectOne('/me')
      .flush({ success: true }, { status: 504, statusText: 'Gateway Timeout' });

    expect(toastr.error).toHaveBeenCalledWith('504 Gateway Timeout');
  });
});
