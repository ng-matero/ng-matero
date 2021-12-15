import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { filter, map, share, switchMap } from 'rxjs/operators';
import { LocalStorageService } from '@shared';
import { Token } from './interface';
import { BaseToken, GuestToken } from './token';
import { TokenFactory } from './token-factory.service';
import { currentTimestamp } from './helpers';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private key = 'ng-matero-token';

  private tokenChange$ = new BehaviorSubject<boolean>(true);
  private change$ = this.tokenChange$.pipe(
    filter(changed => changed),
    map(() => this.token),
    share()
  );
  private refresh$ = this.tokenChange$.pipe(
    filter(() => this.token.needRefresh()),
    switchMap(() => timer(this.token.getRefreshTime() * 1000)),
    map(() => this.token),
    share()
  );

  private _token?: BaseToken;

  constructor(private store: LocalStorageService, private factory: TokenFactory) {}

  private get token(): BaseToken {
    if (!this._token) {
      this._token = this.factory.create(this.store.get(this.key));
    }

    return this._token;
  }

  onChange(): Observable<BaseToken> {
    return this.change$;
  }

  onRefresh(): Observable<BaseToken> {
    return this.refresh$;
  }

  set(response: Token | any, triggerChange = true): TokenService {
    return this.save(response, triggerChange);
  }

  clear(): void {
    this._token = undefined;
    this.store.remove(this.key);
    this.tokenChange$.next(true);
  }

  valid(): boolean {
    return this.token.valid();
  }

  getBearerToken(): string {
    return this.token.getBearerToken();
  }

  getRefreshToken(): string | void {
    return this.token.refresh_token;
  }

  canAssignUserWhenLogin(): boolean {
    return this.token.valid() || !this.hasRefreshToken();
  }

  canAssignUserWhenRefresh(): boolean {
    return this.token.valid() && !this.isGuest();
  }

  private isGuest(): boolean {
    return this.token instanceof GuestToken;
  }

  private hasRefreshToken(): boolean {
    return !!this.token.refresh_token;
  }

  private save(response: Token | any, triggerChange = false): TokenService {
    this._token = undefined;

    const exp = response.expires_in ? { exp: currentTimestamp() + response.expires_in } : {};
    const token: Token = Object.assign({ access_token: '', token_type: 'Bearer' }, response, exp);

    this.store.set(this.key, token);
    this.tokenChange$.next(triggerChange);

    return this;
  }
}
