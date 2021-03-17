import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';
import { LocalStorageService } from '../../shared/services/storage.service';
import { Token } from './interface';

function capitalize(str: string) {
  return str.substring(0, 1).toUpperCase() + str.substring(1, str.length).toLowerCase();
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private key = 'TOKEN';
  private change$ = new BehaviorSubject<Token>(this.store.get(this.key) as Token);

  constructor(private store: LocalStorageService) {}

  set(token: Token) {
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

  get value() {
    const token = this.get();

    return token.access_token || token.token || '';
  }

  get type() {
    const token = this.get();

    return capitalize(token.token_type || 'bearer');
  }

  headerValue() {
    const value = this.value;

    return value ? [this.type, value].join(' ') : '';
  }
}
