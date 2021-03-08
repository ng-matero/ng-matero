import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { Token, TokenService } from '@core/authentication/token.service';
import { TokenModel, User } from '@core/authentication/interface';

export const guest: User = {
  id: 0,
  avatar: '',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<User>(guest);

  constructor(private http: HttpClient, private token: TokenService) {
    this.token.change().pipe(
      switchMap(() => iif(() => this.check(), this.http.get<User>('/me'), of(guest))),
    ).subscribe(response => this.user$.next(response));
  }

  isAuthenticated() {
    return of(this.check());
  }

  check() {
    return this.token.get().valid();
  }

  login(email: string, password: string, rememberMe = false) {
    return this.http.post<TokenModel>('/auth/login', { email, password, remember_me: rememberMe }).pipe(
      tap(response => this.token.set(new Token(response))),
      map(() => this.check()),
    );
  }

  logout() {
    if (!this.check()) {
      return of(false);
    }

    return this.http.post('/logout', {}).pipe(
      tap(() => this.token.clear()),
      map(() => !this.check()),
    );
  }

  user() {
    return this.user$.pipe(share());
  }
}
