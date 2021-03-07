import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { Token, TokenService } from '@core/authentication2/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.tokenService.change().pipe(
      switchMap(() => iif(() => this.check(), this.http.get('/me'), of(null))),
    ).subscribe(response => this.user$.next(response));
  }

  isAuthenticated() {
    return of(this.check());
  }

  check() {
    return this.tokenService.get().valid();
  }

  login(email: string, password: string, rememberMe = false) {
    return this.http.post<any>('/auth/login', { email, password, remember_me: rememberMe }).pipe(
      tap(response => this.tokenService.set(new Token(response))),
      map(() => this.check()),
    );
  }

  logout() {
    if (!this.check()) {
      return of(false);
    }

    return this.http.post('/logout', {}).pipe(
      tap(() => this.tokenService.clear()),
      map(() => !this.check()),
    );
  }

  user() {
    return this.user$.pipe(share());
  }
}
