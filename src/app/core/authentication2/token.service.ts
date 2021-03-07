import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  private change$ = new BehaviorSubject(new Token());

  set(token: Token) {
    this.change$.next(token);

    return this;
  }

  get() {
    return this.change$.getValue();
  }

  clear() {
    this.change$.next(new Token());
  }
}
