import { TestBed } from '@angular/core/testing';

import { AuthService, guest } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Token, TokenService } from '@core/authentication/token.service';
import { skip } from 'rxjs/operators';
import { DummyStorageService, LocalStorageService } from '@shared';

describe('AuthService', () => {
  let authService: AuthService;
  let tokenService: TokenService;
  let httpMock: HttpTestingController;
  const email = 'foo@bar.com';
  const tokenResponse = { access_token: 'token', token_type: 'bearer' };
  const userResponse = { id: 1, email };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: LocalStorageService, useClass: DummyStorageService }],
    });
    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should log in failed', () => {
    authService.login(email, 'password', false).subscribe(
      isLogin => expect(isLogin).toBeFalse(),
    );
    httpMock.expectOne('/auth/login').flush({});
  });

  it('should log in successful and get user info', () => {
    authService.login(email, 'password', false).subscribe(
      isLogin => expect(isLogin).toBeTrue(),
    );
    authService.user().pipe(skip(1)).subscribe(
      user => expect(user).toEqual(userResponse),
    );

    httpMock.expectOne('/auth/login').flush(tokenResponse);
    httpMock.expectOne('/me').flush(userResponse);
  });

  it('should log out failed when user is not login', () => {
    authService.logout().subscribe(
      isLogout => expect(isLogout).toBeFalse(),
    );
    httpMock.expectNone('/logout');
  });

  it('should log out successful when user is login', () => {
    tokenService.set(new Token(tokenResponse));

    authService.logout().subscribe(
      isLogout => expect(isLogout).toBeTrue(),
    );

    authService.user().pipe(skip(2)).subscribe(
      user => expect(user).toEqual(guest),
    );

    httpMock.expectOne('/me').flush(userResponse);
    httpMock.expectOne('/logout').flush({});
  });
});
