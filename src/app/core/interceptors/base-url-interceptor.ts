import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, InjectionToken, inject } from '@angular/core';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private readonly baseUrl = inject(BASE_URL, { optional: true });

  private hasScheme = (url: string) => this.baseUrl && new RegExp('^http(s)?://', 'i').test(url);

  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    return this.hasScheme(req.url) === false
      ? next.handle(req.clone({ url: this.prependBaseUrl(req.url) }))
      : next.handle(req);
  }

  private prependBaseUrl(url: string) {
    return [this.baseUrl?.replace(/\/$/g, ''), url.replace(/^\.?\//, '')]
      .filter(val => val)
      .join('/');
  }
}
