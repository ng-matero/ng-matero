import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SettingsService } from '../bootstrap/settings.service';

@Injectable()
export class SettingsInterceptor implements HttpInterceptor {
  constructor(private settings: SettingsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({
        headers: request.headers.append('Accept-Language', this.settings.language),
      })
    );
  }
}
