import { Injectable } from '@angular/core';

export class Token {
  constructor(private attributes: any = {}) {}

  get accessToken() {
    return this.attributes.access_token;
  }

  valid() {
    return !!this.accessToken;
  }
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private token = new Token();

  set(token: Token) {
    this.token = token;

    return this;
  }

  get() {
    return this.token;
  }

  clear() {
    this.token = new Token();
  }
}
