import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable, of, OperatorFunction } from 'rxjs';
import { catchError, filter, map, share, switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { LoginService } from './login.service';
import { Menu, User } from './interface';
import { guest } from './user';
import { filterObject } from './helpers';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<User>(guest);

  constructor(private loginService: LoginService, private tokenService: TokenService) {}

  onChange(): Observable<User> {
    const token$ = this.tokenService
      .triggerChange()
      .pipe(filter(() => this.tokenService.canAssignUserWhenLogin()));

    const refresh$ = this.tokenService.triggerRefresh().pipe(
      switchMap(() => this.refresh()),
      filter(() => this.tokenService.canAssignUserWhenRefresh())
    );

    return merge(token$, refresh$).pipe(
      switchMap(() => (this.check() ? this.assignUser() : this.assignGuest()))
    );
  }

  check(): boolean {
    return this.tokenService.valid();
  }

  login(email: string, password: string, rememberMe = false): Observable<boolean> {
    return this.loginService.login(email, password, rememberMe).pipe(
      tap(token => this.tokenService.set(token)),
      map(() => this.check())
    );
  }

  refresh(): Observable<boolean> {
    return this.loginService
      .refresh(filterObject({ refresh_token: this.tokenService.getRefreshToken() }))
      .pipe(
        catchError(() => of(false)),
        tap(result => (!result ? this.tokenService.clear() : this.tokenService.refresh(result))),
        map(() => this.check())
      );
  }

  logout(): Observable<boolean> {
    return this.loginService.logout().pipe(
      tap(() => this.tokenService.clear()),
      map(() => !this.check())
    );
  }

  user(): Observable<User> {
    return this.user$.pipe(share());
  }

  menu(): Observable<{ menu: Menu[] }> {
    return this.loginService.menu();
  }

  private assignUser(): Observable<User> {
    return this.loginService.me().pipe(this.updateUser());
  }

  private assignGuest(): Observable<User> {
    return of(guest).pipe(this.updateUser());
  }

  private updateUser(): OperatorFunction<User, User> {
    return tap(user => this.user$.next(Object.assign({}, guest, user)));
  }
}
