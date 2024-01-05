import { Directionality } from '@angular/cdk/bidi';
import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AppDirectionality, LocalStorageService } from '@shared';
import { AppSettings, AppTheme, defaults } from '../settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private key = 'ng-matero-settings';

  private readonly notify$ = new BehaviorSubject<Partial<AppSettings>>({});

  get notify() {
    return this.notify$.asObservable();
  }

  private htmlElement!: HTMLHtmlElement;

  options: AppSettings;

  themeColor: Exclude<AppTheme, 'auto'> = 'light';

  constructor(
    private store: LocalStorageService,
    private mediaMatcher: MediaMatcher,
    @Inject(DOCUMENT) private document: Document,
    @Inject(Directionality) public dir: AppDirectionality
  ) {
    const storedOptions = this.store.get(this.key);
    this.options = Object.assign(defaults, storedOptions);
    this.themeColor = this.getThemeColor();
    this.htmlElement = this.document.querySelector('html')!;
  }

  reset() {
    this.store.remove(this.key);
  }

  getThemeColor() {
    // Check whether the browser support `prefers-color-scheme`
    if (
      this.options.theme === 'auto' &&
      this.mediaMatcher.matchMedia('(prefers-color-scheme)').media !== 'not all'
    ) {
      const isSystemDark = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches;
      // Set theme to dark if `prefers-color-scheme` is dark. Otherwise, set it to light.
      return isSystemDark ? 'dark' : 'light';
    } else {
      return this.options.theme as Exclude<AppTheme, 'auto'>;
    }
  }

  setOptions(options: AppSettings) {
    this.options = Object.assign(defaults, options);
    this.store.set(this.key, this.options);
    this.notify$.next(this.options);
  }

  setLanguage(lang: string) {
    this.options.language = lang;
    this.store.set(this.key, this.options);
    this.notify$.next(this.options);
  }

  setDirection() {
    this.dir.value = this.options.dir;
    this.htmlElement.dir = this.dir.value;
  }

  setTheme() {
    this.themeColor = this.getThemeColor();

    if (this.themeColor === 'dark') {
      this.htmlElement.classList.add('theme-dark');
    } else {
      this.htmlElement.classList.remove('theme-dark');
    }
  }
}
