import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { APP_INITIALIZER } from '@angular/core';
import { NgxPermissionsModule, NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { LocalStorageService, MemoryStorageService } from '@shared/services/storage.service';
import { AuthService, TokenService } from '@core/authentication';
import { MenuService } from '@core/bootstrap/menu.service';
import { StartupService } from '@core/bootstrap/startup.service';
import { AuthServiceFactory } from '@core/initializers';

describe('StartupService', () => {
  let httpMock: HttpTestingController;
  let startup: StartupService;
  let tokenService: TokenService;
  let menuService: MenuService;
  let mockPermissionsService: NgxPermissionsService;
  let mockRolesService: NgxRolesService;

  const user = {
    id: 1,
    name: 'Zongbin',
    email: 'nzb329@163.com',
    avatar: './assets/images/avatar.jpg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxPermissionsModule.forRoot()],
      providers: [
        {
          provide: LocalStorageService,
          useClass: MemoryStorageService,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: AuthServiceFactory,
          deps: [AuthService],
          multi: true,
        },
        {
          provide: NgxPermissionsService,
          useValue: {
            loadPermissions: (permissions: string[]) => void 0,
          },
        },
        {
          provide: NgxRolesService,
          useValue: {
            flushRoles: () => void 0,
            addRoles: (params: { ADMIN: string[] }) => void 0,
          },
        },
        StartupService,
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    startup = TestBed.inject(StartupService);
    tokenService = TestBed.inject(TokenService);
    menuService = TestBed.inject(MenuService);
    mockPermissionsService = TestBed.inject(NgxPermissionsService);
    mockRolesService = TestBed.inject(NgxRolesService);
  });

  afterEach(() => httpMock.verify());

  it('should load menu when token changed and token valid', async () => {
    const menuData = { menu: [] };
    const permissions = ['canAdd', 'canDelete', 'canEdit', 'canRead'];
    spyOn(menuService, 'addNamespace');
    spyOn(menuService, 'set');
    spyOn(mockPermissionsService, 'loadPermissions');
    spyOn(mockRolesService, 'flushRoles');
    spyOn(mockRolesService, 'addRoles');

    await startup.load();

    tokenService.set({ access_token: 'token', token_type: 'bearer' });

    httpMock.expectOne('/me').flush(user);
    httpMock.expectOne('/me/menu').flush(menuData);

    expect(menuService.addNamespace).toHaveBeenCalledWith(menuData.menu, 'menu');
    expect(menuService.set).toHaveBeenCalledWith(menuData.menu);
    expect(mockPermissionsService.loadPermissions).toHaveBeenCalledWith(permissions);
    expect(mockRolesService.flushRoles).toHaveBeenCalledWith();
    expect(mockRolesService.addRoles).toHaveBeenCalledWith({ ADMIN: permissions });
  });

  it('should clear menu when token changed and token invalid', async () => {
    spyOn(menuService, 'addNamespace');
    spyOn(menuService, 'set');

    await startup.load();

    tokenService.set({ access_token: '', token_type: 'bearer' });

    httpMock.expectNone('/me/menu');

    expect(menuService.addNamespace).toHaveBeenCalledWith([], 'menu');
    expect(menuService.set).toHaveBeenCalledWith([]);
  });
});
