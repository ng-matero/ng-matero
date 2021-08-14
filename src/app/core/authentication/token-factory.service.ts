import { Injectable } from '@angular/core';
import { TokenAttribute } from './interface';
import { JwtToken, SimpleToken } from './token';

@Injectable({
  providedIn: 'root',
})
export class TokenFactory {
  create(attributes: TokenAttribute) {
    if (JwtToken.is(attributes.accessToken)) {
      return new JwtToken(attributes);
    }

    return new SimpleToken(attributes);
  }
}
