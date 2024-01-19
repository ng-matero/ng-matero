import { KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SettingsService } from '@core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translate',
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu">
      <mat-icon>translate</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      @for (lang of langs | keyvalue; track lang) {
        <button mat-menu-item (click)="useLanguage(lang.key)">
          <span>{{ lang.value }}</span>
        </button>
      }
    </mat-menu>
  `,
  standalone: true,
  imports: [KeyValuePipe, MatButtonModule, MatIconModule, MatMenuModule],
})
export class TranslateComponent {
  langs = {
    'en-US': 'English',
    'zh-CN': '中文简体',
    'zh-TW': '中文繁体',
  };

  constructor(
    private translate: TranslateService,
    private settings: SettingsService
  ) {
    translate.addLangs(['en-US', 'zh-CN', 'zh-TW']);
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.settings.setLanguage(language);
  }
}
