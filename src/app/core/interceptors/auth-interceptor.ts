import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../authentication/token.service';
import { SettingsService } from '@core/bootstrap/settings.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _router: Router,
    private _toastr: ToastrService,
    private _token: TokenService,
    private _settings: SettingsService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add server host
    const url = environment.SERVER_ORIGIN + req.url;

    // Only intercept API url
    if (!url.includes('/api/')) {
      return next.handle(req.clone({})).pipe();
    }

    // All APIs need JWT authorization
    const headers = {
      Accept: 'application/json',
      // 'Accept-Language': this._settings.language,
      // 'Authorization': `Bearer ${this._token.get().token}`,
    };

    const newReq = req.clone({ url, setHeaders: headers, withCredentials: true });

    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        //  error:   { code: **, msg: 'error' }
        //  success: { code: 0,  msg: 'success', data: {} }
        if (event instanceof HttpResponse) {
          const body: any = event.body;
          if (body && body.code !== 0) {
            if (body.msg && body.msg !== '') {
              this._toastr.error(body.msg);
            }
            return throwError({});
          } else {
            return of(event);
          }
        }
        // Pass down event if everything is OK
        return of(event);
      }),
      catchError((error: HttpErrorResponse) => this._handleErrorReq(error))
    );
  }

  private _goTo(url: string) {
    setTimeout(() => this._router.navigateByUrl(url));
  }

  private _handleErrorReq(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case 401:
        this._goTo(`/auth/login`);
        break;
      case 403:
      case 404:
      case 500:
        this._goTo(`/sessions/${error.status}`);
        break;
      default:
        if (error instanceof HttpErrorResponse) {
          console.warn(error);
          this._toastr.error(error.error.msg || `${error.status} ${error.statusText}`);
        }
        break;
    }
    return throwError(error);
  }
}
