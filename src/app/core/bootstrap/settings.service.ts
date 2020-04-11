import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AppSettings, defaults } from '../settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private notify$ = new Subject<any>();

  private _options = defaults;

  get notify(): Observable<any> {
    return this.notify$.asObservable();
  }

  setLayout(options?: AppSettings): AppSettings {
    this._options = Object.assign(defaults, options);
    return this._options;
  }

  setNavState(type: string, value: boolean) {
    this.notify$.next({ type, value } as any);
  }

  getOptions(): AppSettings {
    return this._options;
  }
}
