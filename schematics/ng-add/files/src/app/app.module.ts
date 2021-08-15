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
import { LoginService } from '@core/authentication/login.service';

// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

class FakeLoginService extends LoginService {
  private token = { access_token: 'MW56YjMyOUAxNjMuY29tWm9uZ2Jpbg==', token_type: 'bearer' };

  login() {
    // return this.http.post<TokenResponse | any>('/auth/login', {
    //   email,
    //   password,
    //   remember_me: rememberMe,
    // });

    return of(this.token);
  }

  refresh() {
    // return this.http.post<TokenResponse | any>('/auth/refresh', {});
    return of(this.token);
  }

  logout() {
    // return this.http.post('/auth/logout', {});
    return of({});
  }

  me() {
    // return this.http.get<User>('/me');
    return of(admin);
  }

  menu() {
    // return this.http.get('/me/menu');

    return this.http.get('assets/data/menu.json?_t=' + Date.now());
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
    { provide: LoginService, useClass: FakeLoginService },
    httpInterceptorProviders,
    appInitializerProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
