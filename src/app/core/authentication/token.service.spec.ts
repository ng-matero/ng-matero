import { TestBed } from '@angular/core/testing';
import { tap } from 'rxjs/operators';
import { MemoryStorageService, LocalStorageService } from '@shared/services/storage.service';
import { TokenService, currentTimestamp } from '@core/authentication';

describe('TokenService', () => {
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LocalStorageService, useClass: MemoryStorageService }],
    });
    tokenService = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(tokenService).toBeTruthy();
  });

  it('should get authorization header value', () => {
    tokenService.set({ access_token: 'token' });

    expect(tokenService.headerValue()).toEqual('Bearer token');
  });

  it('cannot get authorization header value', () => {
    tokenService.set({});

    expect(tokenService.headerValue()).toBe('');
  });

  it('should not has exp when token has expires_in', () => {
    tokenService.set({ access_token: 'token' });

    tokenService
      .triggerChange()
      .pipe(tap(token => expect(token!.exp).toBeUndefined()))
      .subscribe();
  });

  it('should has exp when token has expires_in', () => {
    const expiresIn = 3600;
    tokenService.set({ access_token: 'token', expires_in: expiresIn });

    tokenService
      .triggerChange()
      .pipe(tap(token => expect(token!.exp).toEqual(currentTimestamp() + expiresIn)))
      .subscribe();
  });
});
