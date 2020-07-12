import { Injectable, Injector } from '@angular/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class TranslateLangService {
  constructor(
    private _injector: Injector,
    private _translate: TranslateService,
    private _settings: SettingsService
  ) {}

  load() {
    return new Promise<any>((resolve: any) => {
      const locationInitialized = this._injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
      locationInitialized.then(() => {
        const browserLang = navigator.language;
        const defaultLang = browserLang.match(/en-US|zh-CN|zh-TW/) ? browserLang : 'en-US';

        this._settings.setLanguage(defaultLang);
        this._translate.setDefaultLang(defaultLang);
        this._translate.use(defaultLang).subscribe(
          () => {
            console.log(`Successfully initialized '${defaultLang}' language.'`);
          },
          () => {
            console.error(`Problem with '${defaultLang}' language initialization.'`);
          },
          () => {
            resolve(null);
          }
        );
      });
    });
  }
}
