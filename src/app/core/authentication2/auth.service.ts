import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isAuthenticated() {
    return of(true);
  }

  login(email: string, password: string, rememberMe = false) {
    return this.http.post('/auth/login', { email, password, remember_me: rememberMe }).pipe(
      map(token => 'access_token' in token),
    );
  }
}
