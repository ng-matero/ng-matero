import { Injectable } from '@angular/core';

export interface Defaults {
  showHeader?: boolean;
  headerPos?: 'fixed' | 'static' | 'above';
  navPos?: 'side' | 'top';
  sidenavCollapsed?: boolean;
  showUserPanel?: boolean;
  dir?: 'ltr' | 'rtl';
}

const defaults: Defaults = {
  showHeader: true,
  headerPos: 'fixed',
  navPos: 'side',
  sidenavCollapsed: false,
  showUserPanel: true,
  dir: 'ltr',
};

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  options = defaults;

  setLayout(options?: Defaults) {
    this.options = Object.assign(defaults, options);
    return this.options;
  }

  getOptions() {
    return this.options;
  }

  setApp() {}

  setUser() {}
}
