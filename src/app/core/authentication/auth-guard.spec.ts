import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { AuthService, TokenService, authGuard } from '@core/authentication';
import { LocalStorageService, MemoryStorageService } from '@shared/services/storage.service';

@Component({
  template: '',
  imports: [],
  providers: [provideHttpClientTesting()],
})
class Dummy {}

describe('authGuard function unit test', () => {
  const route: any = {};
  const state: any = {};
  let router: Router;
  let authService: AuthService;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Dummy],
      providers: [
        { provide: LocalStorageService, useClass: MemoryStorageService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([
          { path: 'dashboard', component: Dummy, canActivate: [authGuard] },
          { path: 'auth/login', component: Dummy },
        ]),
      ],
    });
    TestBed.createComponent(Dummy);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should be authenticated', () => {
    inject([AuthService, Router], () => {
      tokenService.set({ access_token: 'token', token_type: 'bearer' });

      expect(authGuard(route, state)).toBeTrue();
    });
  });

  it('should redirect to /auth/login when authenticate failed', () => {
    inject([AuthService, Router], () => {
      spyOn(authService, 'check').and.returnValue(false);

      expect(authGuard(route, state)).toEqual(router.parseUrl('/auth/login'));
    });
  });
});
