import { Service } from '@angular/core';
import { Token } from './interface';
import { BaseToken, JwtToken, SimpleToken } from './token';

@Service()
export class TokenFactory {
  create(attributes: Token): BaseToken | undefined {
    if (!attributes.access_token) {
      return undefined;
    }

    if (JwtToken.is(attributes.access_token)) {
      return new JwtToken(attributes);
    }

    return new SimpleToken(attributes);
  }
}
