import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SanctumService } from '../bootstrap/sanctum.service';


@Injectable()
export class SanctumInterceptor implements HttpInterceptor {
  private ready = false;

  constructor(private sanctum: SanctumService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.ready === false) {
      this.ready = true;

      return this.sanctum.toObservable().pipe(
        switchMap(() => next.handle(request)),
      );
    }

    return next.handle(request);
  }
}
