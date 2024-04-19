import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { switchMap } from 'rxjs';

import { SanctumService } from '@core';

@Injectable()
export class SanctumInterceptor implements HttpInterceptor {
  private readonly sanctum = inject(SanctumService);

  private ready = false;

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    if (!this.ready) {
      this.ready = true;

      return this.sanctum.toObservable().pipe(switchMap(() => next.handle(request)));
    }

    return next.handle(request);
  }
}
