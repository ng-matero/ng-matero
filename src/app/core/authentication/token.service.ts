import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { filter, map, share, switchMap } from 'rxjs/operators';
import { LocalStorageService } from '../../shared/services/storage.service';
import { RefreshToken, SimpleToken, Token } from './interface';
import { timeLeft } from './helpers';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private key = 'TOKEN';
  private token = new SimpleToken(this.store.get(this.key));
  private change$ = new BehaviorSubject<RefreshToken | null>(this.token);

  constructor(private store: LocalStorageService) {}

  set(token: Token, refresh = false) {
    this.token = SimpleToken.create(token);
    this.store.set(this.key, this.token);
    this.change$.next(Object.assign({ refresh }, this.token));

    return this;
  }

  get() {
    return this.token;
  }

  clear() {
    this.store.remove(this.key);
    this.change$.next(null);
    this.token = null;
  }

  change() {
    return this.change$.pipe(
      filter(token => token && !token.refresh),
      share()
    );
  }

  refresh() {
    return this.change$.pipe(
      filter(token => token && token.exp > 0),
      map(token => timeLeft(token.exp - 5000)),
      switchMap(delay => timer(delay)),
      filter(() => this.valid()),
      share()
    );
  }

  valid() {
    return this.token && !!this.token.valid();
  }

  headerValue() {
    return this.token.headerValue();
  }
}
