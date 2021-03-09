import { TestBed } from '@angular/core/testing';

import { TokenService } from '@core';
import { MemoryStorageService, LocalStorageService } from '@shared';

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

  it('should get authorization header', () => {
    service.set({ token: 'token' });

    expect(service.header()).toEqual({
      Authorization: 'Bearer token',
    });
  });

  it('cannot get authorization header', () => {
    service.set({});

    expect(service.header()).toEqual({});
  });

});
