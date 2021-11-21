import { Injectable } from '@angular/core';
import { Token } from './interface';
import { GuestToken, SimpleToken, JwtToken, BaseToken } from './token';

@Injectable({
  providedIn: 'root',
})
export class TokenFactory {
  create(attributes: Token): BaseToken {
    if (!attributes.access_token) {
      return new GuestToken();
    }

    if (JwtToken.is(attributes.access_token)) {
      return new JwtToken(attributes);
    }

    return new SimpleToken(attributes);
  }
}
