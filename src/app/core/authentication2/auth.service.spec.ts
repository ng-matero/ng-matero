import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Token, TokenService } from '@core/authentication2/token.service';

describe('AuthService', () => {
  let authService: AuthService;
  let tokenService: TokenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should log in failed', () => {
    authService.login('foo@bar.com', 'password', false).subscribe(
      isLogin => expect(isLogin).toBeFalse(),
    );
    httpMock.expectOne('/auth/login').flush({});
  });

  it('should log in successful', () => {
    authService.login('foo@bar.com', 'password', false).subscribe(
      isLogin => expect(isLogin).toBeTrue(),
    );
    httpMock.expectOne('/auth/login').flush({
      access_token: 'token', token_type: 'bearer',
    });
  });

  it('should log out failed when user is not login', () => {
    authService.logout().subscribe(
      isLogout => expect(isLogout).toBeFalse(),
    );
    httpMock.expectNone('/logout');
  });

  it('should log out successful when user is login', () => {
    tokenService.set(new Token({ access_token: 'token' }));
    authService.logout().subscribe(
      isLogout => expect(isLogout).toBeTrue(),
    );
    httpMock.expectOne('/logout').flush({});
  });
});
