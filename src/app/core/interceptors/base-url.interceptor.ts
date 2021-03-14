import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

function hasScheme(url: string) {
  return environment.baseUrl && new RegExp('^http(s)?://', 'i').test(url);
}

function prependBaseUrl(url: string) {
  return [
    environment.baseUrl.replace(/\/$/g, ''),
    url.replace(/^\.?\//, ''),
  ].filter(val => val).join('/');
}

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return hasScheme(request.url) === false
      ? next.handle(request.clone({ url: prependBaseUrl(request.url) }))
      : next.handle(request);
  }
}
