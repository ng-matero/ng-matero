import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '@core/bootstrap/settings.service';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService, private settings: SettingsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = req.headers.append('Accept-Language', this.settings.language);

    if (!req.url.includes('/api/')) {
      return next.handle(req.clone({ headers }));
    }

    return next.handle(req.clone({ headers })).pipe(
      mergeMap((event: HttpEvent<any>) => this.handleOkReq(event)),
      catchError((error: HttpErrorResponse) => this.handleErrorReq(error)),
    );
  }

  private goto(url: string) {
    setTimeout(() => this.router.navigateByUrl(url));
  }

  private handleOkReq(event: HttpEvent<any>): Observable<any> {
    if (event instanceof HttpResponse) {
      const body: any = event.body;
      // failure: { code: **, msg: 'failure' }
      // success: { code: 0,  msg: 'success', data: {} }
      if (body && 'code' in body && body.code !== 0) {
        if (body.msg && body.msg !== '') {
          this.toastr.error(body.msg);
        }
        return throwError([]);
      }
    }
    // Pass down event if everything is OK
    return of(event);
  }

  private handleErrorReq(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case 401:
        this.goto(`/auth/login`);
        break;
      case 403:
      case 404:
      case 500:
        this.goto(`/sessions/${error.status}`);
        break;
      default:
        if (error instanceof HttpErrorResponse) {
          console.error('ERROR', error);
          this.toastr.error(error.error.msg || `${error.status} ${error.statusText}`);
        }
        break;
    }
    return throwError(error);
  }
}
