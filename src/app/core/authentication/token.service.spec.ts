import { TestBed } from '@angular/core/testing';

import { Token, TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get authorization header', () => {
    const token = new Token({
      access_token: 'token',
    });

    expect(token.header()).toEqual({
      Authorization: 'Bearer token',
    });
  });
});
