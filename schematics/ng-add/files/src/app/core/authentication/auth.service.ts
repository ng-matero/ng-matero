import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { TokenResponse, User } from './interface';
import { admin, guest } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<User>(guest);

  // private userReq$ = this.http.get<User>('/me');
  private userReq$ = of(admin);

  constructor(private http: HttpClient, private token: TokenService) {
    this.token
      .changed()
      .pipe(switchMap(() => (this.check() ? this.userReq$ : of(guest))))
      .subscribe(user => this.user$.next(Object.assign({}, guest, user)));

    this.token
      .refreshed()
      .pipe(switchMap(() => this.refresh()))
      .subscribe();
  }

  check() {
    return this.token.valid();
  }

  login(email: string, password: string, rememberMe = false) {
    // return this.http
    //   .post<TokenResponse>('/auth/login', { email, password, remember_me: rememberMe })
    //   .pipe(
    //     tap(token => this.token.set(token)),
    //     map(() => this.check())
    //   );
    const _token = { access_token: 'MW56YjMyOUAxNjMuY29tWm9uZ2Jpbg==', token_type: 'bearer' };
    return of(_token).pipe(
      tap(token => this.token.set(token)),
      map(() => this.check())
    );
  }

  refresh() {
    return this.http.post<TokenResponse>('/auth/refresh', {}).pipe(
      tap(token => this.token.refresh(token)),
      map(() => this.check())
    );
  }

  logout() {
    // return this.http.post('/auth/logout', {}).pipe(
    //   tap(() => this.token.clear()),
    //   map(() => !this.check())
    // );
    return of({}).pipe(
      tap(() => this.token.clear()),
      map(() => !this.check())
    );
  }

  user() {
    return this.user$.pipe(share());
  }
}
