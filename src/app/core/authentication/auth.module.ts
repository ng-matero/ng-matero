import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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

// export function SanctumServiceFactory(sanctumService: SanctumService) {
//   return () => sanctumService.load();
// }

export function AuthServiceFactory(authService: AuthService) {
  return () => authService.init();
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    ConfigService,
    LoginService,
    TokenFactoryService,
    TokenService,
    AuthService,
    AuthGuard,
    SanctumService,
    { provide: APP_INITIALIZER, useFactory: AuthServiceFactory, deps: [AuthService], multi: true },
    { provide: SANCTUM_BASE_URL, useExisting: TOKEN_BASE_URL },
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    // { provide: HTTP_INTERCEPTORS, useClass: SanctumInterceptor, multi: true },
  ],
})
export class AuthModule {}
