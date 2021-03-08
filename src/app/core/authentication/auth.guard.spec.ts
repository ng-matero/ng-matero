import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from '@core/authentication/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Token, TokenService } from '@core/authentication/token.service';
import { DummyStorageService, LocalStorageService } from '@shared';

describe('AuthGuard', () => {
  const route: any = {};
  const state: any = {};
  const router: any = { navigate: () => {} };
  let authGuard: AuthGuard;
  let authService: AuthService;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: router },
        { provide: LocalStorageService, useClass: DummyStorageService },
      ],
    });
    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should be authenticated', () => {
    spyOn(tokenService, 'get').and.returnValue(new Token({ access_token: 'token' }));

    authGuard.canActivate(route, state).subscribe(
      authenticated => {
        expect(authenticated).toBeTrue();
      },
    );
  });

  it('should redirect to /auth/login when authenticate failed', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(of(false));
    spyOn(router, 'navigate');

    authGuard.canActivate(route, state).subscribe(
      authenticated => {
        expect(authenticated).toBeFalse();
      },
    );
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });
});
