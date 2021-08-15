import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { filter, map, share, switchMap } from 'rxjs/operators';
import { LocalStorageService } from '../../shared/services/storage.service';
import { Token, TokenResponse } from './interface';
import { now } from './helpers';
import { TokenFactory } from './token-factory.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private key = 'TOKEN';
  private _token: Token | null = null;
  private change$ = new BehaviorSubject<boolean>(true);

  constructor(private store: LocalStorageService, private factory: TokenFactory) {}

  set(token: TokenResponse | any) {
    this.setToken(token, true);

    return this;
  }

  refresh(token: TokenResponse | any) {
    this.setToken(token, false);
  }

  clear() {
    this.clearToken();
  }

  changed() {
    return this.change$.pipe(
      filter(changed => changed),
      map(() => this.getToken()),
      share()
    );
  }

  refreshed() {
    return this.change$.pipe(
      filter(() => this.hasRefreshTime()),
      switchMap(() => timer(this.getRefreshTime())),
      filter(() => this.valid()),
      map(() => this.getToken()),
      share()
    );
  }

  valid() {
    return !!this.getToken()?.valid();
  }

  headerValue() {
    return this.getToken()?.headerValue();
  }

  private getToken(): Token | null {
    if (!this.hasToken()) {
      return null;
    }

    if (!this._token) {
      this._token = this.factory.create(this.store.get(this.key));
    }

    return this._token;
  }

  private setToken(token: any, changed = false) {
    this._token = null;
    const accessToken = token.access_token || token.token || '';
    const tokenType = token.token_type || 'bearer';
    const expiresIn = token.expires_in || 0;
    const exp = expiresIn <= 0 ? 0 : now() + expiresIn * 1000;

    this.store.set(this.key, Object.assign({}, token, { accessToken, tokenType, exp }));
    this.change$.next(changed);
  }

  private hasToken() {
    return this.store.has(this.key);
  }

  private clearToken() {
    this._token = null;
    this.store.remove(this.key);
    this.change$.next(true);
  }

  private hasRefreshTime() {
    return this.hasToken() && this.getToken()!.exp() > 0;
  }

  private getRefreshTime() {
    return this.getToken()!.refreshTime();
  }
}
