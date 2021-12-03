import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, iif, merge, of } from 'rxjs';
import { catchError, map, share, switchMap, take, tap } from 'rxjs/operators';
import { ConfigService, TokenService, RefreshToken, Token, User, filterObject } from '..';
import { Menu } from '@core/bootstrap/menu.service';

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
    protected http: HttpClient,
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
    const refreshToken = filterObject({ refresh_token: this.tokenService.getRefreshToken() });

    return this.doRefresh(refreshToken).pipe(
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

  private assignUser() {
    if (!this.check()) {
      return of(undefined).pipe(tap(user => this.user$.next(user)));
    }

    return this.user().pipe(
      take(1),
      switchMap(user => iif(() => !!user, of(user), this.updateUser()))
    );
  }

  private updateUser() {
    return this.fetchProfile().pipe(
      tap(user => this.user$.next(this.configService.setUserDefaultValue(user)))
    );
  }

  protected doLogin(email: string, password: string, rememberMe: boolean) {
    const params = { email, password, remember_me: rememberMe };

    return this.http.post<Token>(this.configService.getLoginUrl(), params);
  }

  protected doRefresh(refreshToken?: RefreshToken) {
    return this.http.post<Token>(this.configService.getRefreshUrl(), refreshToken);
  }

  protected doLogout() {
    return this.http.post(this.configService.getLogoutUrl(), {});
  }

  protected fetchProfile() {
    return this.http.get<User>(this.configService.getProfileUrl());
  }

  protected fetchMenu() {
    return this.http
      .get<{ menu: Menu[] }>(this.configService.getMenuUrl())
      .pipe(map(res => res.menu));
  }
}
