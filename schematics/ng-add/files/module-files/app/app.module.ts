import { inject, NgModule, provideAppInitializer } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';<% if(animations!='excluded') { %>
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';<% } %>

import { AppComponent } from './app.component';

import { CoreModule } from '@core/core.module';
import { ThemeModule } from '@theme/theme.module';
import { SharedModule } from '@shared/shared.module';
import { RoutesModule } from './routes/routes.module';
import { FormlyConfigModule } from './formly-config';
import { NgxPermissionsModule } from 'ngx-permissions';
import { provideToastr } from 'ngx-toastr';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {
  apiInterceptor,
  BASE_URL,
  baseUrlInterceptor,
  errorInterceptor,
  loggingInterceptor,
  noopInterceptor,
  settingsInterceptor,
  StartupService,
  tokenInterceptor,
  TranslateLangService,
} from '@core';
import { environment } from '@env/environment';

// Required for AOT compilation
function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}

// Http interceptor providers in outside-in order
const interceptors = [
  noopInterceptor,
  baseUrlInterceptor,
  settingsInterceptor,
  tokenInterceptor,
  apiInterceptor,
  errorInterceptor,
  loggingInterceptor,
];

import { LoginService } from '@core/authentication/login.service';
import { FakeLoginService } from './fake-login.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    ThemeModule,
    SharedModule,
    RoutesModule,
    FormlyConfigModule.forRoot(),
    NgxPermissionsModule.forRoot(),
  ],
  providers: [
    { provide: BASE_URL, useValue: environment.baseUrl },
    provideAppInitializer(() => inject(TranslateLangService).load()),
    provideAppInitializer(() => inject(StartupService).load()),
    provideHttpClient(withInterceptors(interceptors)),<% if(animations!='excluded') { %>
    provideAnimationsAsync(<% if(animations=='disabled') { %>'noop'<% } %>),<% } %>
    provideToastr(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    // ==================================================
    // 👇 ❌ Remove it in the realworld application
    //
    { provide: LoginService, useClass: FakeLoginService },
    //
    // ==================================================
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
