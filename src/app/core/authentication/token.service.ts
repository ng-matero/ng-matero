import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';
import { LocalStorageService } from '@shared';
import { TokenModel } from '@core/authentication/interface';

function capitalize(str: string) {
  return str.substring(0, 1).toUpperCase() + str.substring(1, str.length).toLowerCase();
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private key = 'TOKEN';
  private change$ = new BehaviorSubject<TokenModel>(this.store.get(this.key) as TokenModel);

  constructor(private store: LocalStorageService) {}

  set(token: TokenModel) {
    this.change$.next(token);
    this.store.set(this.key, token);

    return this;
  }

  get() {
    return this.change$.getValue();
  }

  clear() {
    this.store.remove(this.key);
    this.change$.next({});
  }

  change() {
    return this.change$.pipe(share());
  }

  valid() {
    return !!this.get().access_token;
  }

  header() {
    const token = this.get();
    const data = [capitalize(token.token_type || 'Bearer')];

    if (token.access_token) {
      data.push(token.access_token);
    }

    return { Authorization: data.join(' ') };
  }
}
