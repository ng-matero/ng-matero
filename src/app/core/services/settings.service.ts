import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface Defaults {
  showHeader?: boolean;
  headerPos?: 'fixed' | 'static' | 'above';
  navPos?: 'side' | 'top';
  sidenavCollapsed?: boolean;
  sidenavOpened?: boolean;
  showUserPanel?: boolean;
  dir?: 'ltr' | 'rtl';
}

const defaults: Defaults = {
  showHeader: true,
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

  setLayout(options?: Defaults) {
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
