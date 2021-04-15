import { TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TokenService } from '@core/authentication/token.service';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LocalStorageService, MemoryStorageService } from '../../shared/services/storage.service';

@Component({ template: '' })
class DummyComponent {}

describe('AuthGuard', () => {
  const route: any = {};
  const state: any = {};
  let router: Router;
  let authGuard: AuthGuard;
  let authService: AuthService;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: DummyComponent, canActivate: [AuthGuard] },
          { path: 'auth/login', component: DummyComponent },
        ]),
      ],
      declarations: [DummyComponent],
      providers: [{ provide: LocalStorageService, useClass: MemoryStorageService }],
    });
    TestBed.createComponent(DummyComponent);

    router = TestBed.inject(Router);
    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should be authenticated', () => {
    tokenService.set({ access_token: 'token' });

    expect(authGuard.canActivate(route, state)).toBeTrue();
  });

  it('should redirect to /auth/login when authenticate failed', () => {
    spyOn(authService, 'check').and.returnValue(false);

    expect(authGuard.canActivate(route, state)).toEqual(router.parseUrl('/auth/login'));
  });
});
