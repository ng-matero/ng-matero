import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, merge, of } from 'rxjs';
import { catchError, map, share, switchMap, take, tap } from 'rxjs/operators';
import { ConfigService, filterObject, LoginService, RefreshToken, TokenService, User } from '..';

@Injectable()
export class AuthService {
  private user$ = new BehaviorSubject<User | undefined>(undefined);
  private change$ = merge(
    this.tokenService.change(),
    this.tokenService.refresh().pipe(switchMap(() => this.refresh()))
  ).pipe(
    switchMap(() => this.assignUser()),
    share()
  );

  constructor(
    private loginService: LoginService,
    private configService: ConfigService,
    private tokenService: TokenService
  ) {}

  init() {
    return new Promise<void>(resolve => this.change$.subscribe(() => resolve(undefined)));
  }

  check() {
    return this.tokenService.valid();
  }

  login(email: string, password: string, rememberMe = false) {
    return this.doLogin(email, password, rememberMe).pipe(
      tap(token => this.tokenService.set(token)),
      map(() => this.check())
    );
  }

  refresh() {
    return this.doRefresh(
      filterObject({ refresh_token: this.tokenService.getRefreshToken() })
    ).pipe(
      catchError(() => of(undefined)),
      tap(token => this.tokenService.set(token)),
      map(() => this.check())
    );
  }

  logout() {
    return this.doLogout().pipe(
      tap(() => this.tokenService.clear()),
      map(() => !this.check())
    );
  }

  user() {
    return this.user$.pipe(share());
  }

  menu() {
    return iif(() => this.check(), this.fetchMenu(), of([]));
  }

  protected doLogin(email: string, password: string, rememberMe: boolean) {
    return this.loginService.login(email, password, rememberMe);
  }

  protected doRefresh(refreshToken: RefreshToken) {
    return this.loginService.refresh(refreshToken);
  }

  protected doLogout() {
    return this.loginService.logout();
  }

  protected fetchProfile() {
    return this.loginService.me();
  }

  protected fetchMenu() {
    return this.loginService.menu();
  }

  private updateUser() {
    return this.fetchProfile().pipe(
      tap(user => this.user$.next(this.configService.setUserDefaults(user)))
    );
  }

  private assignUser() {
    if (!this.check()) {
      return of(undefined).pipe(tap(user => this.user$.next(user)));
    }

    return this.user().pipe(
      take(1),
      switchMap(user => iif(() => !!user, of(user), this.updateUser()))
    );
  }
}
