import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';
import { MemoryStorageService, LocalStorageService } from '@shared/services/storage.service';
import { TokenService, AuthService, LoginService, guest, User } from '@core/authentication';
import { HttpRequest } from '@angular/common/http';

describe('AuthService', () => {
  let authService: AuthService;
  let loginService: LoginService;
  let tokenService: TokenService;
  let httpMock: HttpTestingController;
  let user$: Observable<User>;
  const email = 'foo@bar.com';
  const token = { access_token: 'token', token_type: 'bearer' };
  const user = { id: 1, email };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: LocalStorageService, useClass: MemoryStorageService }],
    });
    loginService = TestBed.inject(LoginService);
    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
    httpMock = TestBed.inject(HttpTestingController);

    authService.onChange().subscribe();
    user$ = authService.user();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should log in failed', () => {
    const body = {};

    authService.login(email, 'password', false).subscribe(isLogin => expect(isLogin).toBeFalse());
    httpMock.expectOne('/auth/login').flush(body);

    expect(authService.check()).toBeFalse();
  });

  it('should log in successful and get user info', () => {
    const body = token;

    user$.pipe(skip(1)).subscribe(currentUser => expect(currentUser.id).toEqual(user.id));
    authService.login(email, 'password', false).subscribe(isLogin => expect(isLogin).toBeTrue());
    httpMock.expectOne('/auth/login').flush(body);
    httpMock.expectOne('/me').flush(user);

    expect(authService.check()).toBeTrue();
  });

  it('should refresh token after 5 seconds', fakeAsync(() => {
    const body = Object.assign({ expires_in: 5 }, token);

    authService.login(email, 'password', false).subscribe(isLogin => expect(isLogin).toBeTrue());
    httpMock.expectOne('/auth/login').flush(body);
    httpMock.expectOne('/me').flush(user);
    tick(5000);
    httpMock.match(req => req.url === '/auth/refresh' && !req.body.refresh_token)[0].flush(token);

    expect(authService.check()).toBeTrue();
  }));

  it('should refresh token with refresh_token', fakeAsync(() => {
    const body = Object.assign({ expires_in: -5, refresh_token: 'foo' }, token);
    const match = (req: HttpRequest<any>) =>
      req.url === '/auth/refresh' && req.body.refresh_token === 'foo';

    authService.login(email, 'password', false).subscribe(isLogin => expect(isLogin).toBeFalse());
    httpMock.expectOne('/auth/login').flush(body);
    tick(5000);
    httpMock.match(match)[0].flush(token);

    expect(authService.check()).toBeTrue();
  }));

  it('it should clear token when refresh token response is 401', fakeAsync(() => {
    spyOn(tokenService, 'clear').and.callThrough();
    const body = Object.assign({ expires_in: -5, refresh_token: 'foo' }, token);
    const headers = { status: 401, statusText: 'Unauthorized' };
    const match = (req: HttpRequest<any>) =>
      req.url === '/auth/refresh' && req.body.refresh_token === 'foo';

    authService.login(email, 'password', false).subscribe(isLogin => expect(isLogin).toBeFalse());
    httpMock.expectOne('/auth/login').flush(body);
    tick(5000);
    httpMock.match(match)[0].flush({}, headers);

    expect(authService.check()).toBeFalse();
    expect(tokenService.clear).toHaveBeenCalled();
  }));

  it('should log out failed when user is not login', () => {
    spyOn(loginService, 'logout').and.callThrough();

    authService.logout().subscribe();
    httpMock.expectNone('/logout');

    expect(authService.check()).toBeFalse();
    expect(loginService.logout).toHaveBeenCalled();
  });

  it('should log out successful when user is login', () => {
    const body = Object.assign({ expires_in: -5, refresh_token: 'foo' }, token);
    let changeTimes = 0;
    let refreshTimes = 0;

    tokenService.triggerChange().subscribe(() => changeTimes++);
    tokenService.triggerRefresh().subscribe(() => refreshTimes++);
    authService.login(email, 'password', false).subscribe(isLogin => expect(isLogin).toBeFalse());
    httpMock.expectOne('/auth/login').flush(body);

    user$.pipe(skip(1)).subscribe(currentUser => expect(currentUser.id).toEqual(guest.id));
    authService.logout().subscribe();
    httpMock.expectOne('/auth/logout').flush({});

    expect(changeTimes).toEqual(3);
    expect(refreshTimes).toEqual(0);
  });
});
