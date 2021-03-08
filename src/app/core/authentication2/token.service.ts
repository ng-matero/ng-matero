import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';
import { LocalStorageService } from '@shared';

export class Token {
  constructor(private attributes: any = {}) {}

  get accessToken() {
    return this.attributes.access_token;
  }

  valid() {
    return !!this.accessToken;
  }

  toJson() {
    return this.attributes;
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
