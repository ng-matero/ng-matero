import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AppSettings, defaults } from '../settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private notice$ = new Subject<any>();

  private options = defaults;

  get notice(): Observable<any> {
    return this.notice$.asObservable();
  }

  setLayout(options?: AppSettings): AppSettings {
    this.options = Object.assign(defaults, options);
    return this.options;
  }

  setNavState(type: string, value: boolean) {
    this.notice$.next({ type, value } as any);
  }

  getOptions(): AppSettings {
    return this.options;
  }
}
