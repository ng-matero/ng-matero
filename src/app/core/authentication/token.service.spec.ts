import { TestBed } from '@angular/core/testing';
import { tap } from 'rxjs/operators';
import { MemoryStorageService, LocalStorageService } from '@shared/services/storage.service';
import { TokenService, currentTimestamp, TokenFactory, SimpleToken } from '@core/authentication';

describe('TokenService', () => {
  let tokenService: TokenService;
  let tokenFactory: TokenFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LocalStorageService, useClass: MemoryStorageService }],
    });
    tokenService = TestBed.inject(TokenService);
    tokenFactory = TestBed.inject(TokenFactory);
  });

  it('should be created', () => {
    expect(tokenService).toBeTruthy();
  });

  it('should get authorization header value', () => {
    tokenService.set({ access_token: 'token' });

    expect(tokenService.getBearerToken()).toEqual('Bearer token');
  });

  it('cannot get authorization header value', () => {
    tokenService.set({});

    expect(tokenService.getBearerToken()).toBe('');
  });

  it('should not has exp when token has expires_in', () => {
    tokenService.set({ access_token: 'token' });

    tokenService
      .onChange()
      .pipe(tap(token => expect(token!.exp).toBeUndefined()))
      .subscribe();
  });

  it('should has exp when token has expires_in', () => {
    const expiresIn = 3600;
    tokenService.set({ access_token: 'token', expires_in: expiresIn });

    tokenService
      .onChange()
      .pipe(tap(token => expect(token!.exp).toEqual(currentTimestamp() + expiresIn)))
      .subscribe();
  });

  it('can assign user when login with valid access_token', () => {
    const token = { access_token: 'foo', token_type: 'bearer' };
    spyOn(tokenFactory, 'create').and.returnValue(new SimpleToken(token));
    tokenService.set(token);

    expect(tokenService.canAssignUserWhenLogin()).toBeTrue();
  });

  it('can not assign user when login with invalid access_token and valid refresh_token ', () => {
    const token = { access_token: '', token_type: 'bearer', refresh_token: 'refresh' };
    spyOn(tokenFactory, 'create').and.returnValue(new SimpleToken(token));
    tokenService.set(token);

    expect(tokenService.canAssignUserWhenLogin()).toBeFalse();
  });

  it('can assign user when refresh with valid access_token', () => {
    const token = { access_token: 'token', token_type: 'bearer', refresh_token: 'refresh' };
    spyOn(tokenFactory, 'create').and.returnValue(new SimpleToken(token));
    tokenService.set(token);

    expect(tokenService.canAssignUserWhenRefresh()).toBeTrue();
  });
});
