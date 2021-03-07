import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from '@core/authentication2/auth.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  const route: any = {};
  const state: any = {};
  const router: any = { navigate: () => {} };
  let authGuard: AuthGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: router }],
    });
    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should be authenticated', () => {
    expect(authGuard.canActivate(route, state)).toBeTrue();
  });

  it('should redirect to /auth/login when authenticate failed', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    spyOn(router, 'navigate');

    expect(authGuard.canActivate(route, state)).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });
});
