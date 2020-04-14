import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AppSettings, defaults } from '../settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _notify$ = new Subject<any>();

  private _options = defaults;

  get notify(): Observable<any> {
    return this._notify$.asObservable();
  }

  setLayout(options?: AppSettings): AppSettings {
    this._options = Object.assign(defaults, options);
    return this._options;
  }

  setNavState(type: string, value: boolean) {
    this._notify$.next({ type, value } as any);
  }

  getOptions(): AppSettings {
    return this._options;
  }

  setLanguage(language: string) {
    this._options.language = language;
    this._notify$.next({ language });
  }
}
