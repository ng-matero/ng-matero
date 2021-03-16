import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import { MemoryStorageService, LocalStorageService } from '../../shared/services/storage.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LocalStorageService, useClass: MemoryStorageService }],
    });
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get authorization header value', () => {
    service.set({ token: 'token' });

    expect(service.headerValue()).toEqual('Bearer token');
  });

  it('cannot get authorization header value', () => {
    service.set({});

    expect(service.headerValue()).toBe('');
  });

});
