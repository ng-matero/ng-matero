import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import { DummyStorageService, LocalStorageService } from '@shared';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LocalStorageService, useClass: DummyStorageService }],
    });
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get authorization header', () => {
    service.set({ access_token: 'token' });

    expect(service.header()).toEqual({
      Authorization: 'Bearer token',
    });
  });
});
