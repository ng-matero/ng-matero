import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';
import { LocalStorageService } from '@shared';
import { TokenModel } from '@core/authentication2/interface';

function capitalize(str: string) {
  return str.substring(0, 1).toUpperCase() + str.substring(1, str.length).toLowerCase();
}

export class Token {
  readonly accessToken?: string;
  readonly tokenType: string;

  constructor(private tokenModel: TokenModel = {}) {
    this.accessToken = tokenModel.access_token;
    this.tokenType = tokenModel.token_type || 'Bearer';
  }

  valid() {
    return !!this.accessToken;
  }

  toJson() {
    return this.tokenModel;
  }

  header() {
    return { Authorization: [capitalize(this.tokenType), this.accessToken].join(' ') };
  }
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private key = 'TOKEN';
  private change$ = new BehaviorSubject(new Token(this.store.get(this.key)));

  constructor(private store: LocalStorageService) {}

  set(token: Token) {
    this.change$.next(token);
    this.store.set(this.key, token.toJson());

    return this;
  }

  get() {
    return this.change$.getValue();
  }

  clear() {
    this.store.remove(this.key);
    this.change$.next(new Token());
  }

  change() {
    return this.change$.pipe(share());
  }
}
