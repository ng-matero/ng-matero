import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgxPermissionsModule, NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { LocalStorageService, MemoryStorageService } from '../../shared/services/storage.service';
import { TokenService } from '../authentication/token.service';
import { MenuService } from './menu.service';
import { StartupService } from './startup.service';

describe('StartupService', () => {
  let httpMock: HttpTestingController;
  let startup: StartupService;
  let token: TokenService;
  let menu: MenuService;
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
    token = TestBed.inject(TokenService);
    menu = TestBed.inject(MenuService);
    mockPermissionsSrv = TestBed.inject(NgxPermissionsService);
    mockRolesSrv = TestBed.inject(NgxRolesService);
  });

  afterEach(() => httpMock.verify());

  it('should load menu when token changed and token valid', () => {
    const menuData = { menu: [] };
    const permissions = ['canAdd', 'canDelete', 'canEdit', 'canRead'];
    spyOn(menu, 'addNamespace');
    spyOn(menu, 'set');
    spyOn(mockPermissionsSrv, 'loadPermissions');
    spyOn(mockRolesSrv, 'addRoles');

    startup.load();

    token.set({ access_token: 'token' });

    httpMock.expectOne('/me/menu').flush(menuData);

    expect(menu.addNamespace).toHaveBeenCalledWith(menuData.menu, 'menu');
    expect(menu.set).toHaveBeenCalledWith(menuData.menu);
    expect(mockPermissionsSrv.loadPermissions).toHaveBeenCalledWith(permissions);
    expect(mockRolesSrv.addRoles).toHaveBeenCalledWith({ ADMIN: permissions });
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
