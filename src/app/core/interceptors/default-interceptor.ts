import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('/api/')) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
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
