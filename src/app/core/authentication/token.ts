import { base64, capitalize, currentTimestamp, timeLeft } from './helpers';
import { Token } from './interface';

export abstract class BaseToken {
  constructor(protected attributes: Token) {}

  get access_token(): string {
    return this.attributes.access_token;
  }

  get refresh_token() {
    return this.attributes.refresh_token;
  }

  get token_type() {
    return this.attributes.token_type;
  }

  get exp() {
    return this.attributes.exp;
  }

  valid() {
    return this.hasAccessToken() && !this.isExpired();
  }

  getBearerToken() {
    return this.access_token
      ? [capitalize(this.token_type), this.access_token].join(' ').trim()
      : '';
  }

  needRefresh() {
    return this.exp !== undefined && this.exp >= 0;
  }

  getRefreshTime() {
    return timeLeft((this.exp ?? 0) - 5);
  }

  private hasAccessToken() {
    return !!this.access_token;
  }

  private isExpired() {
    return this.exp !== undefined && this.exp - currentTimestamp() <= 0;
  }
}

export class GuestToken extends BaseToken {
  constructor() {
    super({ access_token: '', token_type: '' });
  }
}

export class SimpleToken extends BaseToken {}

export class JwtToken extends SimpleToken {
  private _payload?: { exp: number | undefined };

  static is(accessToken: string) {
    try {
      const [_header] = accessToken.split('.');
      const header = JSON.parse(base64.decode(_header));

      return header.typ.toUpperCase().includes('JWT');
    } catch (e) {
      return false;
    }
  }

  get exp() {
    return this.payload!.exp;
  }

  private get payload() {
    if (!this.access_token) {
      return { exp: undefined };
    }

    if (!this._payload) {
      const [, payload] = this.access_token.split('.');
      const data = JSON.parse(base64.decode(payload));
      if (!data.exp) {
        data.exp = this.attributes.exp;
      }
      this._payload = data;
    }

    return this._payload;
  }
}
