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
  styles: [
    `
      .flag-icon {
        margin-right: 8px;
      }
    `,
  ],
})
export class TranslateComponent {
  langs = {
    'en-US': 'English',
    'zh-CN': '中文简体',
    'zh-TW': '中文繁体',
  };

  constructor(public translate: TranslateService, private settings: SettingsService) {
    translate.addLangs(['en-US', 'zh-CN', 'zh-TW']);
    translate.setDefaultLang('en-US');

    const browserLang = navigator.language;
    translate.use(browserLang.match(/en-US|zh-CN|zh-TW/) ? browserLang : 'en-US');
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.settings.setLanguage(language);
  }
}
