import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { SettingsService } from '@core';

@Injectable()
export class SettingsInterceptor implements HttpInterceptor {
  private settings = inject(SettingsService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(
      req.clone({
        headers: req.headers.append('Accept-Language', this.settings.options.language),
      })
    );
  }
}
