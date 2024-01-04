import { TestBed, inject } from '@angular/core/testing';

import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService, MemoryStorageService } from '@shared/services/storage.service';
import { TokenService, AuthService, authGuard } from '@core/authentication';

@Component({
  template: '',
  standalone: true,
  imports: [HttpClientTestingModule],
})
class DummyComponent {}

describe('authGuard function unit test', () => {
  const route: any = {};
  const state: any = {};
  let router: Router;
  let authService: AuthService;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: DummyComponent, canActivate: [authGuard] },
          { path: 'auth/login', component: DummyComponent },
        ]),
        DummyComponent,
      ],
      providers: [{ provide: LocalStorageService, useClass: MemoryStorageService }],
    });
    TestBed.createComponent(DummyComponent);
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
