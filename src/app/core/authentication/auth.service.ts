import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, merge, of } from 'rxjs';
import { catchError, map, share, switchMap, take, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { LoginService } from './login.service';
import { ConfigService } from './config.service';
import { User } from './interface';
import { filterObject } from './helpers';

@Injectable({
  providedIn: 'root',
})
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
    private configService: ConfigService,
    private loginService: LoginService,
    private tokenService: TokenService
  ) {}

  init() {
    this.change$.subscribe();
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
    return this.doRefresh().pipe(
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
      tap(user => console.log(user)),
      take(1),
      switchMap(user =>
        iif(
          () => !!user,
          of(user),
          this.fetchProfile().pipe(
            tap(user => this.user$.next(this.configService.setUserDefaultValue(user)))
          )
        )
      )
    );
  }

  protected doLogin(email: string, password: string, rememberMe: boolean) {
    return this.loginService.login(email, password, rememberMe);
  }

  protected doRefresh() {
    return this.loginService.refresh(
      filterObject({ refresh_token: this.tokenService.getRefreshToken() })
    );
  }

  protected doLogout() {
    return this.loginService.logout();
  }

  protected fetchProfile() {
    return this.loginService.profile();
  }

  protected fetchMenu() {
    return this.loginService.menu();
  }
}
