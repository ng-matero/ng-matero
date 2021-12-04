import { NgModule } from '@angular/core';
import {
  AuthGuard,
  AuthService,
  ConfigService,
  LoginService,
  SanctumService,
  TokenFactory,
  TokenService,
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
    LoginService,
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
