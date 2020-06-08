import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { LocalStorageService } from '@shared/services/storage.service';
import { TokenModel, AuthReferrer } from './interface';

const TOKEN_KEY = 'jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _change$ = new BehaviorSubject(null);

  private _referrer: AuthReferrer = {};

  constructor(private _store: LocalStorageService) {}

  /**
   * The referrer of current page
   */
  get referrer() {
    return this._referrer;
  }

  set(data: TokenModel): boolean {
    this._change$.next(data);
    return this._store.set(TOKEN_KEY, data);
  }

  get<T extends TokenModel>(type?: new () => T): T {
    const data = this._store.get(TOKEN_KEY);
    return type ? (Object.assign(new type(), data) as T) : (data as T);
  }

  clear() {
    this._store.remove(TOKEN_KEY);
  }

  change(): Observable<TokenModel | null> {
    return this._change$.pipe(share());
  }
}
