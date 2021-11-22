import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private hasScheme = (url: string) => this.baseUrl && new RegExp('^http(s)?://', 'i').test(url);

  constructor(@Optional() @Inject(BASE_URL) private baseUrl?: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.hasScheme(request.url) === false
      ? next.handle(request.clone({ url: this.prependBaseUrl(request.url) }))
      : next.handle(request);
  }

  private prependBaseUrl(url: string) {
    return [this.baseUrl?.replace(/\/$/g, ''), url.replace(/^\.?\//, '')]
      .filter(val => val)
      .join('/');
  }
}
