import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { skip } from 'rxjs/operators';
import { MemoryStorageService, LocalStorageService } from '../../shared/services/storage.service';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { guest } from './interface';

describe('AuthService', () => {
  let authService: AuthService;
  let tokenService: TokenService;
  let httpMock: HttpTestingController;
  const email = 'foo@bar.com';
  const token = { access_token: 'token', token_type: 'bearer' };
  const user = { id: 1, email };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: LocalStorageService, useClass: MemoryStorageService }],
    });
    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should log in failed', () => {
    authService.login(email, 'password', false).subscribe(isLogin => expect(isLogin).toBeFalse());
    httpMock.expectOne('/auth/login').flush({});
  });

  it('should log in successful and get user info', () => {
    authService.login(email, 'password', false).subscribe(isLogin => expect(isLogin).toBeTrue());
    authService
      .user()
      .pipe(skip(1))
      .subscribe(currentUser => expect(currentUser).toEqual(currentUser));

    httpMock.expectOne('/auth/login').flush(token);
    httpMock.expectOne('/me').flush(user);
  });

  it('should log out failed when user is not login', () => {
    authService.logout().subscribe(isLogout => expect(isLogout).toBeFalse());
    httpMock.expectNone('/logout');
  });

  it('should log out successful when user is login', () => {
    tokenService.set(token);

    authService.logout().subscribe(isLogout => expect(isLogout).toBeTrue());

    authService
      .user()
      .pipe(skip(2))
      .subscribe(currentUser => expect(currentUser).toEqual(guest));

    httpMock.expectOne('/me').flush(user);
    httpMock.expectOne('/auth/logout').flush({});
  });
});
