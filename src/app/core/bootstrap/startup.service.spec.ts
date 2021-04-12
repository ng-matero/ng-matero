import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocalStorageService, MemoryStorageService } from '../../shared/services/storage.service';
import { TokenService } from '../authentication/token.service';
import { StartupService } from './startup.service';
import { MenuService } from './menu.service';

describe('StartupService', () => {
  let httpMock: HttpTestingController;
  let startup: StartupService;
  let token: TokenService;
  let menu: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: LocalStorageService,
          useClass: MemoryStorageService,
        },
        StartupService,
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    startup = TestBed.inject(StartupService);
    token = TestBed.inject(TokenService);
    menu = TestBed.inject(MenuService);
  });

  afterEach(() => httpMock.verify());

  it('should load menu when token changed and token valid', () => {
    const menuData = { menu: [] };
    spyOn(menu, 'addNamespace');
    spyOn(menu, 'set');

    startup.load();

    token.set({ access_token: 'token' });

    httpMock.expectOne('/me/menu').flush(menuData);

    expect(menu.addNamespace).toHaveBeenCalledWith(menuData.menu, 'menu');
    expect(menu.set).toHaveBeenCalledWith(menuData.menu);
  });

  it('should clear menu when token changed and token invalid', () => {
    spyOn(menu, 'addNamespace');
    spyOn(menu, 'set');

    startup.load();

    token.set({});

    httpMock.expectNone('/me/menu');

    expect(menu.addNamespace).toHaveBeenCalledWith([], 'menu');
    expect(menu.set).toHaveBeenCalledWith([]);
  });
});
