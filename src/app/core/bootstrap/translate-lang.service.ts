import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class TranslateLangService {
  constructor(
    private translate: TranslateService,
    private settings: SettingsService
  ) {}

  load() {
    return new Promise<void>(resolve => {
      const browserLang = navigator.language;
      const defaultLang = browserLang.match(/en-US|zh-CN|zh-TW/) ? browserLang : 'en-US';

      this.settings.setLanguage(defaultLang);
      this.translate.setDefaultLang(defaultLang);
      this.translate.use(defaultLang).subscribe({
        next: () => console.log(`Successfully initialized '${defaultLang}' language.'`),
        error: () => console.error(`Problem with '${defaultLang}' language initialization.'`),
        complete: () => resolve(),
      });
    });
  }
}
