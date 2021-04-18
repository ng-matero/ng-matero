import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { skip } from 'rxjs/operators';
import { MemoryStorageService, LocalStorageService } from '../../shared/services/storage.service';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { guest } from './user';

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

  it('should refresh token after 5 seconds', fakeAsync(() => {
    authService.login(email, 'password', false).subscribe(isLogin => expect(isLogin).toBeTrue());
    httpMock.expectOne('/auth/login').flush(Object.assign({ expires_in: 5 }, token));
    tick(5000);
    httpMock.expectOne('/auth/refresh').flush(token);
  }));

  it('should log out failed when user is not login', () => {
    authService.logout().subscribe();
    httpMock.expectNone('/logout');
  });

  it('should log out successful when user is login', () => {
    let changeTimes = 0;
    let refreshTimes = 0;

    tokenService.set(token);
    tokenService.change().subscribe(() => changeTimes++);
    tokenService.refresh().subscribe(() => refreshTimes++);

    authService.logout().subscribe(isLogout => expect(isLogout).toBeTrue());

    authService
      .user()
      .pipe(skip(2))
      .subscribe(currentUser => expect(currentUser).toEqual(guest));

    httpMock.expectOne('/me').flush(user);
    httpMock.expectOne('/auth/logout').flush({});

    expect(changeTimes).toEqual(2);
    expect(refreshTimes).toEqual(0);
  });
});
