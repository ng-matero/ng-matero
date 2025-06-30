import { inject, NgModule, provideAppInitializer } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';<% if(animations!='excluded') { %>
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';<% } %>

import { App } from './app';

import { CoreModule } from '@core/core-module';
import { ThemeModule } from '@theme/theme-module';
import { SharedModule } from '@shared/shared-module';
import { RoutesModule } from './routes/routes-module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { provideToastr } from 'ngx-toastr';
import { FORMLY_CONFIG, provideFormlyCore } from '@ngx-formly/core';
import { withFormlyMaterial } from '@ngx-formly/material';
import { provideTranslateService, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BASE_URL, interceptors, StartupService, TranslateLangService } from '@core';
import { formlyConfigFactory } from '@shared';
import { environment } from '@env/environment';

import { LoginService } from '@core/authentication/login.service';
import { FakeLoginService } from './fake-login.service';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    CoreModule,
    ThemeModule,
    SharedModule,
    RoutesModule,
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
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, 'i18n/', '.json'),
        deps: [HttpClient],
      },
    }),
    provideFormlyCore([...withFormlyMaterial()]),
    {
      provide: FORMLY_CONFIG,
      useFactory: formlyConfigFactory,
      deps: [TranslateService],
      multi: true,
    },
    // ==================================================
    // 👇 ❌ Remove it in the realworld application
    //
    { provide: LoginService, useClass: FakeLoginService },
    //
    // ==================================================
  ],
  bootstrap: [App],
})
export class AppModule {}
