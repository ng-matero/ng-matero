import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@core/authentication';
import { catchError, tap, throwError } from 'rxjs';
import { BASE_URL } from './base-url-interceptor';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenService);
  private readonly baseUrl = inject(BASE_URL, { optional: true });

  private hasHttpScheme = (url: string) => new RegExp('^http(s)?://', 'i').test(url);

  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    const handler = () => {
      if (req.url.includes('/auth/logout')) {
        this.router.navigateByUrl('/auth/login');
      }

      if (this.router.url.includes('/auth/login')) {
        this.router.navigateByUrl('/dashboard');
      }
    };

    if (this.tokenService.valid() && this.shouldAppendToken(req.url)) {
      return next
        .handle(
          req.clone({
            headers: req.headers.append('Authorization', this.tokenService.getBearerToken()),
            withCredentials: true,
          })
        )
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.tokenService.clear();
            }
            return throwError(() => error);
          }),
          tap(() => handler())
        );
    }

    return next.handle(req).pipe(tap(() => handler()));
  }

  private shouldAppendToken(url: string) {
    return !this.hasHttpScheme(url) || this.includeBaseUrl(url);
  }

  private includeBaseUrl(url: string) {
    if (!this.baseUrl) {
      return false;
    }

    const baseUrl = this.baseUrl.replace(/\/$/, '');

    return new RegExp(`^${baseUrl}`, 'i').test(url);
  }
}
