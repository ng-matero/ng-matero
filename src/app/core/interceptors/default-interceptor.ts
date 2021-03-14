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
    );
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
}
