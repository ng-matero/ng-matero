import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '../authentication/token.service';
import { catchError } from 'rxjs/operators';
import { BASE_URL } from '@core/interceptors/base-url-interceptor';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private token: TokenService, @Optional() @Inject(BASE_URL) private baseUrl?: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.token.valid() && this.shouldAppendToken(request.url)) {
      return next.handle(request.clone({
        headers: request.headers.append('Authorization', this.token.headerValue()),
        withCredentials: true,
      })).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.token.clear();
          }
          return throwError(error);
        }),
      );
    }

    return next.handle(request);
  }

  private shouldAppendToken(url: string) {
    return !this.hasHttpScheme(url) || this.includeBaseUrl(url);
  }

  private hasHttpScheme(url: string) {
    return new RegExp('^http(s)?://', 'i').test(url);
  }

  private includeBaseUrl(url: string) {
    if (!this.baseUrl) {
      return false;
    }

    const baseUrl = this.baseUrl.replace(/\/$/, '');

    return new RegExp(`^${baseUrl}`, 'i').test(url);
  }
}
