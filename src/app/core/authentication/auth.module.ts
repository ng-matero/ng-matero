import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  ConfigService,
  TokenFactory,
  TokenService,
  AuthService,
  AuthGuard,
  SanctumService,
  // TokenInterceptor,
} from '.';

// export const tokenInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
// ];
//
// import { SanctumInterceptor } from '.';
//
// export const sanctumProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: SanctumInterceptor, multi: true },
// ];

@NgModule({
  providers: [
    ConfigService,
    TokenFactory,
    TokenService,
    AuthService,
    AuthGuard,
    SanctumService,
    // ...tokenInterceptorProviders,
    // ...sanctumProviders,
  ],
})
export class AuthModule {}
