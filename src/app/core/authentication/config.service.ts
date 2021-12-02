import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { User } from './interface';
import { mergeDeep } from '@core/authentication/helpers';

export interface Config {
  login_url: string;
  refresh_url: string;
  logout_url: string;
  profile_url: string;
  menu_url: string;
  user_defaults: User;
}

export const AUTH_CONFIG = new InjectionToken<Config>('AUTH_CONFIG');

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: Config;

  private defaults: Config = {
    login_url: '/auth/login',
    refresh_url: '/auth/refresh',
    logout_url: '/auth/logout',
    profile_url: '/profile',
    menu_url: '/menu',
    user_defaults: {
      name: 'unknown',
      email: 'unknown',
      avatar: './assets/images/avatar-default.jpg',
    },
  };

  constructor(@Optional() @Inject(AUTH_CONFIG) config?: Config) {
    this.config = mergeDeep<Config>({}, this.defaults, config ?? {});
  }

  getLoginUrl() {
    return this.config.login_url;
  }

  getRefreshUrl() {
    return this.config.refresh_url;
  }

  getLogoutUrl() {
    return this.config.logout_url;
  }

  getProfileUrl() {
    return this.config.profile_url;
  }

  getMenuUrl() {
    return this.config.menu_url;
  }

  setUserDefaultValue(user: User) {
    return Object.assign({}, this.config.user_defaults, user);
  }
}
