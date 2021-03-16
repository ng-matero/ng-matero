import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '@core/interceptors/base-url.interceptor';
import { switchMap } from 'rxjs/operators';

export const SANCTUM_PREFIX = new InjectionToken<string>('SANCTUM_PREFIX');

@Injectable()
export class SanctumInterceptor implements HttpInterceptor {
  private ready = false;

  constructor(
    private http: HttpClient,
    @Optional() @Inject(BASE_URL) private baseUrl?: string,
    @Optional() @Inject(SANCTUM_PREFIX) private prefix?: string,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.ready === false) {
      this.ready = true;

      return this.http.get(this.getUrl()).pipe(
        switchMap(() => next.handle(request)),
      );
    }

    return next.handle(request);
  }

  private getUrl() {
    const path = `/${(this.prefix || 'sanctum')}/csrf-cookie`;

    if (!this.baseUrl) {
      return path;
    }

    const url = new URL(this.baseUrl);

    return url.origin + path;
  }
}
