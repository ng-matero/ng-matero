import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '../authentication/token.service';
import { environment } from '@env/environment';
import { catchError } from 'rxjs/operators';


function hasHttpScheme(url: string) {
  return new RegExp('http(s)?://', 'i').test(url);
}

function includeBaseUrl(url: string) {
  const baseUrl = environment.SERVER_ORIGIN.replace(/\/$/, '');

  return baseUrl !== '' && new RegExp(`^${baseUrl}`, 'i').test(url);
}

function shouldAppendToken(url: string) {
  return !hasHttpScheme(url) || includeBaseUrl(url);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private token: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.token.valid() && shouldAppendToken(request.url)) {
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
}
