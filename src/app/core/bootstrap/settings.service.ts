import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppSettings, defaults } from '../settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _options = defaults;

  get notify(): Observable<any> {
    return this._notify$.asObservable();
  }
  private _notify$ = new BehaviorSubject<any>({});

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

  setLanguage(lang: string) {
    this._options.language = lang;
    this._notify$.next({ lang });
  }
}
