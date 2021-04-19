import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { filter, map, share, switchMap } from 'rxjs/operators';
import { LocalStorageService } from '../../shared/services/storage.service';
import { RefreshToken, Token } from './interface';
import { SimpleToken } from './token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private key = 'TOKEN';
  private token: SimpleToken;
  private change$ = new BehaviorSubject<RefreshToken>(this.get());

  constructor(private store: LocalStorageService) {}

  set(token: Token, refresh = false) {
    this.token = SimpleToken.create(token);
    this.store.set(this.key, this.token);
    this.change$.next(this.token.clone({ refresh }));

    return this;
  }

  get() {
    if (!this.token) {
      this.token = new SimpleToken(this.store.get(this.key));
    }

    return this.token;
  }

  clear() {
    this.store.remove(this.key);
    this.change$.next(null);
    this.token = null;
  }

  change() {
    return this.change$.pipe(
      filter(token => !token || !token.refresh),
      share()
    );
  }

  refresh() {
    return this.change$.pipe(
      filter(() => !!this.token && this.token.exp > 0),
      switchMap(() => timer(this.token.refreshTime())),
      filter(() => this.valid()),
      map(() => this.token),
      share()
    );
  }

  valid() {
    return !!this.token && this.token.valid();
  }

  headerValue() {
    return this.token.headerValue();
  }
}
