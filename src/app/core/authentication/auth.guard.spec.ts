import { TestBed, inject } from '@angular/core/testing';

import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService, MemoryStorageService } from '@shared/services/storage.service';
import { TokenService, AuthService, authenticate } from '@core/authentication';

@Component({ template: '' })
class DummyComponent {}

describe('authenticate guard function unit test', () => {
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
          { path: 'dashboard', component: DummyComponent, canActivate: [authenticate] },
          { path: 'auth/login', component: DummyComponent },
        ]),
      ],
      declarations: [DummyComponent],
      providers: [{ provide: LocalStorageService, useClass: MemoryStorageService }],
    });
    TestBed.createComponent(DummyComponent);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(authenticate).toBeTruthy();
  });

  it('should be authenticated', () => {
    inject([AuthService, Router], () => {
      tokenService.set({ access_token: 'token', token_type: 'bearer' });

      expect(authenticate(route, state)).toBeTrue();
    });
  });

  it('should redirect to /auth/login when authenticate failed', () => {
    inject([AuthService, Router], () => {
      spyOn(authService, 'check').and.returnValue(false);

      expect(authenticate(route, state)).toEqual(router.parseUrl('/auth/login'));
    });
  });
});
