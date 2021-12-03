import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Config, mergeDeep, User } from '..';

export const AUTH_CONFIG = new InjectionToken<Config | any>('AUTH_CONFIG', {
  providedIn: 'root',
  factory: () => ({}),
});

@Injectable()
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

  constructor(@Inject(AUTH_CONFIG) config: Config) {
    this.config = mergeDeep<Config>({}, this.defaults, config);
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
    return mergeDeep<User>({}, this.config.user_defaults, user);
  }
}
