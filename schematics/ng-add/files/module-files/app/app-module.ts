import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  inject,
  NgModule,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,<% if(zoneless) { %>
  provideZonelessChangeDetection,<% } %>
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';

import { CoreModule } from '@core/core-module';
import { SharedModule } from '@shared/shared-module';
import { ThemeModule } from '@theme/theme-module';
import { RoutesModule } from './routes/routes-module';

import { FORMLY_CONFIG, provideFormlyCore } from '@ngx-formly/core';
import { withFormlyMaterial } from '@ngx-formly/material';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { NgxPermissionsModule } from 'ngx-permissions';

import { BASE_URL, interceptors, StartupService, TranslateLangService } from '@core';
import { environment } from '@env/environment';
import { formlyConfigFactory } from '@shared';

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
    provideBrowserGlobalErrorListeners(),<% if(zoneless) { %>
    provideZonelessChangeDetection(),<% } %>
    { provide: BASE_URL, useValue: environment.baseUrl },
    provideAppInitializer(() => inject(TranslateLangService).load()),
    provideAppInitializer(() => inject(StartupService).load()),
    provideHttpClient(withInterceptors(interceptors)),
    provideHotToastConfig(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: 'i18n/', suffix: '.json' }),
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
