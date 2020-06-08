import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '@core';

@Component({
  selector: 'app-translate',
  template: `
    <button mat-icon-button class="matero-toolbar-button" [matMenuTriggerFor]="menu">
      <mat-icon>translate</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      <button mat-menu-item *ngFor="let lang of langs | keyvalue" (click)="useLanguage(lang.key)">
        <span>{{ lang.value }}</span>
      </button>
    </mat-menu>
  `,
  styles: [],
})
export class TranslateComponent {
  langs = {
    'en-US': 'English',
    'zh-CN': '中文简体',
    'zh-TW': '中文繁体',
  };

  constructor(private _translate: TranslateService, private _settings: SettingsService) {
    _translate.addLangs(['en-US', 'zh-CN', 'zh-TW']);
    _translate.setDefaultLang('en-US');

    const browserLang = navigator.language;
    _translate.use(browserLang.match(/en-US|zh-CN|zh-TW/) ? browserLang : 'en-US');
  }

  useLanguage(language: string) {
    this._translate.use(language);
    this._settings.setLanguage(language);
  }
}
