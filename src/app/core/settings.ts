export type AppTheme = 'light' | 'dark' | 'auto';

export interface AppSettings {
  navPos: 'side' | 'top';
  dir: 'ltr' | 'rtl';
  theme: AppTheme;
  showHeader: boolean;
  headerPos: 'fixed' | 'static' | 'above';
  showUserPanel: boolean;
  sidenavOpened: boolean;
  sidenavCollapsed: boolean;
  language: string;
}

export const defaults: AppSettings = {
  navPos: 'side',
  dir: 'ltr',
  theme: 'auto',
  showHeader: true,
  headerPos: 'fixed',
  showUserPanel: true,
  sidenavOpened: true,
  sidenavCollapsed: false,
  language: 'auto',
};
