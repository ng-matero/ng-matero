import { Injectable } from '@angular/core';
import { LocalStorageService } from '@shared';
import { BehaviorSubject } from 'rxjs';
import { AppSettings, defaults } from '../settings';

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

  constructor(private store: LocalStorageService) {
    const storedOptions = this.store.get(this.key);
    this.options = Object.assign(defaults, storedOptions);
  }

  getOptions(): AppSettings {
    return this.options;
  }

  setOptions(options: AppSettings) {
    this.options = Object.assign(defaults, options);
    this.store.set(this.key, this.options);
    this.notify$.next(this.options);
  }

  getLanguage() {
    return this.options.language;
  }

  setLanguage(lang: string) {
    this.options.language = lang;
    this.store.set(this.key, this.options);
    this.notify$.next(this.options);
  }

  reset() {
    this.store.remove(this.key);
  }
}
