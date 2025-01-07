import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgxPermissionsModule, NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { LocalStorageService, MemoryStorageService } from '@shared/services/storage.service';
import { admin, TokenService } from '@core/authentication';
import { MenuService } from '@core/bootstrap/menu.service';
import { StartupService } from '@core/bootstrap/startup.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('StartupService', () => {
  let httpMock: HttpTestingController;
  let startup: StartupService;
  let tokenService: TokenService;
  let menuService: MenuService;
  let mockPermissionsService: NgxPermissionsService;
  let mockRolesService: NgxRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxPermissionsModule.forRoot()],
      providers: [
        {
          provide: LocalStorageService,
          useClass: MemoryStorageService,
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
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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

    httpMock.expectOne('/user').flush(admin);
    httpMock.expectOne('/user/menu').flush(menuData);

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

    httpMock.expectNone('/user/menu');

    expect(menuService.addNamespace).toHaveBeenCalledWith([], 'menu');
    expect(menuService.set).toHaveBeenCalledWith([]);
  });
});
