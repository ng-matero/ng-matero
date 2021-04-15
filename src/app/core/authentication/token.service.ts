import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay, filter, map, share, switchMap } from 'rxjs/operators';
import { LocalStorageService } from '../../shared/services/storage.service';
import { RefreshToken, Token } from './interface';

function capitalize(str: string) {
  return str.substring(0, 1).toUpperCase() + str.substring(1, str.length).toLowerCase();
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private key = 'TOKEN';
  private change$ = new BehaviorSubject<RefreshToken>(this.get());
  private refresh$ = new BehaviorSubject<RefreshToken>(this.get());

  constructor(private store: LocalStorageService) {}

  set(token: Token, refresh = false) {
    token = this.updateExpiredAt(token);
    this.store.set(this.key, token);
    this.change$.next(Object.assign({ refresh }, token));
    this.refresh$.next(token);

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
      filter(token => token.refresh !== true),
      share()
    );
  }

  refresh() {
    return this.refresh$.pipe(
      map(token => token.expired_at),
      filter(expiredAt => expiredAt > 0),
      map(expiredAt => Math.max(0, expiredAt - this.now() - 5000)),
      switchMap(delayTime => of(delayTime).pipe(delay(delayTime))),
      filter(() => this.valid()),
      share()
    );
  }

  valid() {
    return !!this.getAccessToken() && !this.isExpired();
  }

  headerValue() {
    const accessToken = this.getAccessToken();

    return accessToken ? [this.getTokeType(), accessToken].join(' ') : '';
  }

  private isExpired() {
    const expiredAt = this.getExpiredAt();

    return expiredAt !== 0 && expiredAt - this.now() < 0;
  }

  private getAccessToken() {
    const token = this.get();

    return token.access_token || token.token || '';
  }

  private getTokeType() {
    return capitalize(this.get().token_type || 'bearer');
  }

  private getExpiredAt() {
    return this.get().expired_at;
  }

  private updateExpiredAt(token: Token) {
    return Object.assign(token, {
      expired_at: !token.expires_in ? 0 : this.now() + token.expires_in * 1000,
    });
  }

  private now() {
    return new Date().getTime();
  }
}
