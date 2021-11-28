import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, merge, of } from 'rxjs';
import { catchError, filter, map, share, switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { LoginService } from './login.service';
import { User } from './interface';
import { guest } from './user';
import { filterObject } from './helpers';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<User>(guest);
  private change$ = merge(this.tokenOnChange(), this.tokenOnRefresh()).pipe(
    switchMap(() => this.assignUser()),
    share()
  );

  constructor(private loginService: LoginService, private tokenService: TokenService) {}

  onChange() {
    return this.change$;
  }

  check() {
    return this.tokenService.valid();
  }

  login(email: string, password: string, rememberMe = false) {
    return this.loginService.login(email, password, rememberMe).pipe(
      tap(token => this.tokenService.set(token, true)),
      map(() => this.check())
    );
  }

  refresh() {
    return this.loginService
      .refresh(filterObject({ refresh_token: this.tokenService.getRefreshToken() }))
      .pipe(
        catchError(() => of(false)),
        tap(result => (!result ? this.tokenService.clear() : this.tokenService.set(result, false))),
        map(() => this.check())
      );
  }

  logout() {
    return this.loginService.logout().pipe(
      tap(() => this.tokenService.clear()),
      map(() => !this.check())
    );
  }

  user() {
    return this.user$.pipe(share());
  }

  menu() {
    return this.loginService.menu();
  }

  private assignUser() {
    return iif(() => this.check(), this.loginService.me(), of(guest)).pipe(
      tap(user => this.user$.next(Object.assign({}, guest, user)))
    );
  }

  private tokenOnChange() {
    return this.tokenService
      .onChange()
      .pipe(filter(() => this.tokenService.canAssignUserWhenLogin()));
  }

  private tokenOnRefresh() {
    return this.tokenService.onRefresh().pipe(
      switchMap(() => this.refresh()),
      filter(() => this.tokenService.canAssignUserWhenRefresh())
    );
  }
}
