import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { SanctumService } from '@core';

@Injectable()
export class SanctumInterceptor implements HttpInterceptor {
  private ready = false;

  constructor(private sanctum: SanctumService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.ready) {
      this.ready = true;

      return this.sanctum.toObservable().pipe(switchMap(() => next.handle(request)));
    }

    return next.handle(request);
  }
}
