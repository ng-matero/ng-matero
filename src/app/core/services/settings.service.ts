import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface AppSettings {
  showHeader?: boolean;
  theme?: 'light' | 'dark';
  headerPos?: 'fixed' | 'static' | 'above';
  navPos?: 'side' | 'top';
  sidenavCollapsed?: boolean;
  sidenavOpened?: boolean;
  showUserPanel?: boolean;
  dir?: 'ltr' | 'rtl';
}

const defaults: AppSettings = {
  showHeader: true,
  theme: 'light',
  headerPos: 'fixed',
  navPos: 'side',
  sidenavCollapsed: false,
  sidenavOpened: true,
  showUserPanel: true,
  dir: 'ltr',
};

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private notice$ = new Subject<any>();

  options = defaults;

  get notice(): Observable<any> {
    return this.notice$.asObservable();
  }

  setLayout(options?: AppSettings) {
    this.options = Object.assign(defaults, options);
    return this.options;
  }

  setNavState(type: string, value: boolean) {
    this.notice$.next({ type, value } as any);
  }

  getOptions() {
    return this.options;
  }
}
