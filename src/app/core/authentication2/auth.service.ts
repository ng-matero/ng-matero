import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Token, TokenService } from '@core/authentication2/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

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
}
