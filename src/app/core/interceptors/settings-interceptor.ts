import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { SettingsService } from '@core';

export function settingsInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const settings = inject(SettingsService);

  return next(
    req.clone({
      headers: req.headers.append('Accept-Language', settings.getTranslateLang()),
    })
  );
}
