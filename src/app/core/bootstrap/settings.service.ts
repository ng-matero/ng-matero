import { Inject, Injectable } from '@angular/core';
import { AppDirectionality, LocalStorageService } from '@shared';
import { BehaviorSubject } from 'rxjs';
import { AppSettings, defaults } from '../settings';
import { DOCUMENT } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { Directionality } from '@angular/cdk/bidi';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private key = 'ng-matero-settings';

  private options: AppSettings;

  private readonly notify$ = new BehaviorSubject<Partial<AppSettings>>({});

  get notify() {
    return this.notify$.asObservable();
  }

  private htmlElement!: HTMLHtmlElement;

  constructor(
    private store: LocalStorageService,
    private mediaMatcher: MediaMatcher,
    @Inject(DOCUMENT) private document: Document,
    @Inject(Directionality) public dir: AppDirectionality
  ) {
    const storedOptions = this.store.get(this.key);
    this.options = Object.assign(defaults, storedOptions);

    // Check whether the browser support `prefers-color-scheme`
    if (
      this.options.theme === 'auto' &&
      this.mediaMatcher.matchMedia('(prefers-color-scheme)').media !== 'not all'
    ) {
      const isSystemDark = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches;
      // Set theme to dark if `prefers-color-scheme` is dark. Otherwise, set it to light.
      this.options.theme = isSystemDark ? 'dark' : 'light';
    }

    this.htmlElement = this.document.querySelector('html')!;
  }

  getOptions(): AppSettings {
    return this.options;
  }

  setOptions(options: AppSettings) {
    this.options = Object.assign(defaults, options);
    this.store.set(this.key, this.options);
    this.notify$.next(this.options);
  }

  reset() {
    this.store.remove(this.key);
  }

  getLanguage() {
    return this.options.language;
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
    if (this.options.theme === 'dark') {
      this.htmlElement.classList.add('theme-dark');
    } else {
      this.htmlElement.classList.remove('theme-dark');
    }
  }
}
