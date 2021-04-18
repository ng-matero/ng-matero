import { capitalize, now } from './helpers';

export interface User {
  [propName: string]: any;

  id: number | string | null;
  name?: string;
  email?: string;
  avatar?: string;
}

export interface Token {
  access_token?: string;
  token?: string;
  token_type?: string;
  expires_in?: number;
}

export interface RefreshToken {
  accessToken: string;
  tokenType: string;
  expiresIn?: number;
  expiredAt?: number;
  refresh?: boolean;
}

export class SimpleToken implements RefreshToken {
  accessToken = '';
  tokenType = '';
  expiresIn = 0;
  expiredAt = 0;
  refresh = false;

  constructor(attributes: any) {
    Object.assign(this, attributes || {});
  }

  public static create(token: Token) {
    const accessToken = token.access_token || token.token || '';
    const tokenType = token.token_type || 'bearer';
    const expiresIn = token.expires_in || 0;
    const expiredAt = expiresIn <= 0 ? 0 : now() + expiresIn * 1000;

    return new SimpleToken({ accessToken, tokenType, expiresIn, expiredAt });
  }

  valid() {
    return !!this.accessToken && !this.isExpired();
  }

  isExpired() {
    return this.expiredAt !== 0 && this.expiredAt - now() < 0;
  }

  headerValue() {
    return !!this.accessToken ? [capitalize(this.tokenType), this.accessToken].join(' ') : '';
  }
}

export const admin: User = {
  id: 1,
  name: 'Zongbin',
  email: 'nzb329@163.com',
  avatar: './assets/images/avatar.jpg',
};

export const guest: User = {
  id: null,
  name: 'unknown',
  email: 'unknown',
  avatar: './assets/images/avatar-default.jpg',
};
