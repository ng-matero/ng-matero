import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should log in failed', () => {
    authService.login('foo@bar.com', 'password', false).subscribe(
      isLogin => expect(isLogin).toBeFalse(),
    );
    httpMock.expectOne('/auth/login').flush({});
  });

  it('should log in successful', () => {
    authService.login('foo@bar.com', 'password', false).subscribe(
      isLogin => expect(isLogin).toBeTrue(),
    );
    httpMock.expectOne('/auth/login').flush({
      access_token: 'token', token_type: 'bearer',
    });
  });
});
