import { NgModule } from '@angular/core';
import {
  AuthGuard,
  AuthService,
  ConfigService,
  LoginService,
  SANCTUM_BASE_URL,
  SanctumService,
  TOKEN_BASE_URL,
  TokenFactoryService,
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
    TokenFactoryService,
    TokenService,
    AuthService,
    AuthGuard,
    SanctumService,
    // ...tokenInterceptorProviders,
    // ...sanctumProviders,
    { provide: SANCTUM_BASE_URL, useExisting: TOKEN_BASE_URL },
  ],
})
export class AuthModule {}
