import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Token, User } from './interface';
import { guest } from './user';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<User>(guest);

  constructor(private loginService: LoginService, private token: TokenService) {
    this.token
      .changed()
      .pipe(switchMap(() => (this.check() ? this.loginService.me() : of(guest))))
      .subscribe(user => this.user$.next(Object.assign({}, guest, user)));

    this.token
      .refreshed()
      .pipe(switchMap(token => this.refresh(token)))
      .subscribe();
  }

  check() {
    return this.token.valid();
  }

  login(email: string, password: string, rememberMe = false) {
    return this.loginService.login(email, password, rememberMe).pipe(
      tap(token => this.token.set(token)),
      map(() => this.check())
    );
  }

  refresh(token: Token | null) {
    const refreshToken = token?.refreshToken();
    const params = refreshToken ? { refresh_token: refreshToken } : {};

    return this.loginService.refresh(params).pipe(
      tap(_token => this.token.refresh(_token)),
      map(() => this.check())
    );
  }

  logout() {
    return this.loginService.logout().pipe(
      tap(() => this.token.clear()),
      map(() => !this.check())
    );
  }

  user() {
    return this.user$.pipe(share());
  }
}
