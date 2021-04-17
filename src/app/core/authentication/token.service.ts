import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { filter, map, share, switchMap } from 'rxjs/operators';
import { LocalStorageService } from '../../shared/services/storage.service';
import { RefreshToken, Token } from './interface';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private key = 'TOKEN';
  private change$ = new BehaviorSubject<RefreshToken>(this.get());

  constructor(private store: LocalStorageService) {}

  set(token: Token, refresh = false) {
    const refreshToken = this.toRefreshToken(token);
    this.store.set(this.key, refreshToken);
    this.change$.next(Object.assign({ refresh }, token));

    return this;
  }

  get() {
    return this.store.get(this.key);
  }

  clear() {
    this.store.remove(this.key);
    this.change$.next({});
  }

  change() {
    return this.change$.pipe(
      filter(token => !token.refresh),
      share()
    );
  }

  refresh() {
    return this.change$.pipe(
      filter(token => token.expired_at > 0),
      map(token => Math.max(0, token.expired_at - this.now() - 5000)),
      switchMap(delay => timer(delay)),
      filter(() => this.valid()),
      share()
    );
  }

  valid() {
    const token = this.get();

    return !!token.access_token && !this.isExpired();
  }

  headerValue() {
    const token = this.get();

    return !!token.access_token ? [token.token_type, token.access_token].join(' ') : '';
  }

  private isExpired() {
    const token = this.get();

    return token.expired_at !== 0 && token.expired_at - this.now() < 0;
  }

  private capitalize(str: string) {
    return str.substring(0, 1).toUpperCase() + str.substring(1, str.length).toLowerCase();
  }

  private now() {
    return new Date().getTime();
  }

  private toRefreshToken(token: Token): RefreshToken {
    const accessToken = token.access_token || token.token || '';
    const tokenType = token.token_type || 'bearer';
    const expiredIn = token.expires_in;

    return Object.assign(token, {
      access_token: accessToken,
      token_type: this.capitalize(tokenType),
      expired_at: !expiredIn ? 0 : this.now() + expiredIn * 1000,
    });
  }
}
