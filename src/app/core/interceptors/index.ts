import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NoopInterceptor } from './noop-interceptor';
// import { SanctumInterceptor } from './sanctum-interceptor';
import { BaseUrlInterceptor } from './base-url-interceptor';
import { SettingsInterceptor } from './settings-interceptor';
import { TokenInterceptor } from './token-interceptor';
import { DefaultInterceptor } from './default-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { LoggingInterceptor } from './logging-interceptor';

export * from './noop-interceptor';
// export * from './sanctum-interceptor';
export * from './base-url-interceptor';
export * from './settings-interceptor';
export * from './token-interceptor';
export * from './default-interceptor';
export * from './error-interceptor';
export * from './logging-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: SanctumInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: SettingsInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
];
