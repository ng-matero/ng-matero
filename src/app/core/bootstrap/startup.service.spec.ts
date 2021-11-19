import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgxPermissionsModule, NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { LocalStorageService, MemoryStorageService } from '@shared/services/storage.service';
import { admin, TokenService } from '@core/authentication';
import { MenuService } from '@core/bootstrap/menu.service';
import { StartupService } from '@core/bootstrap/startup.service';

describe('StartupService', () => {
  let httpMock: HttpTestingController;
  let startup: StartupService;
  let tokenService: TokenService;
  let menuService: MenuService;
  let mockPermissionsSrv: NgxPermissionsService;
  let mockRolesSrv: NgxRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxPermissionsModule.forRoot()],
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
    mockPermissionsSrv = TestBed.inject(NgxPermissionsService);
    mockRolesSrv = TestBed.inject(NgxRolesService);
  });

  afterEach(() => httpMock.verify());

  it('should load menu when token changed and token valid', async () => {
    const menuData = { menu: [] };
    const permissions = ['canAdd', 'canDelete', 'canEdit', 'canRead'];
    spyOn(menuService, 'addNamespace');
    spyOn(menuService, 'set');
    spyOn(mockPermissionsSrv, 'loadPermissions');
    spyOn(mockRolesSrv, 'addRoles');

    await startup.load();

    tokenService.set({ access_token: 'token' });

    httpMock.expectOne('/me').flush(admin);
    httpMock.expectOne('/me/menu').flush(menuData);

    expect(menuService.addNamespace).toHaveBeenCalledWith(menuData.menu, 'menu');
    expect(menuService.set).toHaveBeenCalledWith(menuData.menu);
    expect(mockPermissionsSrv.loadPermissions).toHaveBeenCalledWith(permissions);
    expect(mockRolesSrv.addRoles).toHaveBeenCalledWith({ ADMIN: permissions });
  });

  it('should clear menu when token changed and token invalid', async () => {
    spyOn(menuService, 'addNamespace');
    spyOn(menuService, 'set');

    await startup.load();

    tokenService.set({});

    httpMock.expectNone('/me/menu');

    expect(menuService.addNamespace).toHaveBeenCalledWith([], 'menu');
    expect(menuService.set).toHaveBeenCalledWith([]);
  });
});
