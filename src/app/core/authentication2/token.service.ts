import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';
import { LocalStorageService } from '@shared';
import { TokenModel } from '@core/authentication2/auth.service';

export class Token {
  readonly accessToken?: string;
  readonly tokenType?: string;

  constructor(private tokenModel: TokenModel = {}) {
    this.accessToken = tokenModel.access_token;
    this.tokenType = tokenModel.token_type;
  }

  valid() {
    return !!this.accessToken;
  }

  toJson() {
    return this.tokenModel;
  }
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private key = 'TOKEN';
  private change$ = new BehaviorSubject(new Token(this.localStorageService.get(this.key)));

  constructor(private localStorageService: LocalStorageService) {}

  set(token: Token) {
    this.localStorageService.set(this.key, token.toJson());
    this.change$.next(token);

    return this;
  }

  get() {
    return this.change$.getValue();
  }

  clear() {
    this.change$.next(new Token());
  }

  change() {
    return this.change$.pipe(share());
  }
}
