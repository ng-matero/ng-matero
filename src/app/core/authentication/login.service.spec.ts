import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from '@core/authentication';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
