import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { ThemeModule } from './theme/theme.module';
import { RoutesModule } from './routes/routes.module';
import { SharedModule } from './shared/shared.module';
import { FormlyConfigModule } from './formly-config.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '@env/environment';
import { BASE_URL } from '@core/interceptors/base-url-interceptor';
import { httpInterceptorProviders } from '@core/interceptors';
import { appInitializerProviders } from '@core/initializers';
import { AuthService } from '@core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { admin } from '@core/authentication/user';
import { TokenResponse, User } from '@core/authentication/interface';

// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

class FakeAuthService extends AuthService {
  login(email: string, password: string, rememberMe = false) {
    // return this.http
    //   .post<TokenResponse>('/auth/login', { email, password, remember_me: rememberMe })
    //   .pipe(
    //     tap(token => this.token.set(token)),
    //     map(() => this.check())
    //   );
    const _token = { access_token: 'MW56YjMyOUAxNjMuY29tWm9uZ2Jpbg==', token_type: 'bearer' };

    return of(_token).pipe(
      tap(token => this.token.set(token)),
      map(() => this.check())
    );
  }

  refresh() {
    // return this.http.post<TokenResponse | any>('/auth/refresh', {}).pipe(
    //   tap(token => this.token.refresh(token)),
    //   map(() => this.check())
    // );
    const _token = { access_token: 'MW56YjMyOUAxNjMuY29tWm9uZ2Jpbg==', token_type: 'bearer' };

    return of(_token).pipe(
      tap(token => this.token.refresh(token)),
      map(() => this.check())
    );
  }

  logout() {
    // return this.http.post('/auth/logout', {}).pipe(
    //   tap(() => this.token.clear()),
    //   map(() => !this.check())
    // );
    return of({}).pipe(
      tap(() => this.token.clear()),
      map(() => !this.check())
    );
  }

  protected getUser() {
    // return this.http.get<User>('/me');

    return of(admin);
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    ThemeModule,
    RoutesModule,
    SharedModule,
    FormlyConfigModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: BASE_URL, useValue: environment.baseUrl },
    { provide: AuthService, useClass: FakeAuthService },
    httpInterceptorProviders,
    appInitializerProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
