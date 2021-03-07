import { Injectable } from '@angular/core';

export interface Token {
  access_token?: string;
  token_type?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private token: Token = {};

  set(token) {
    this.token = token;

    return this;
  }

  valid() {
    return 'access_token' in this.token && !!this.token.access_token;
  }

  clear() {
    this.token = {};
  }
}
