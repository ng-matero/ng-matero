import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { MenuService } from './menu.service';
import { AuthService } from '@core/authentication';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(
    private authService: AuthService,
    private menuService: MenuService,
    private permissonsSrv: NgxPermissionsService,
    private rolesSrv: NgxRolesService
  ) {}

  /** Load the application only after get the menu or other essential informations such as roles and permissions. */
  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService
        .onChange()
        .pipe(
          switchMap(() => (this.authService.check() ? this.authService.menu() : of({ menu: [] }))),
          catchError(error => throwError(error))
        )
        .subscribe((response: any) => {
          this.menuService.addNamespace(response.menu, 'menu');
          this.menuService.set(response.menu);

          // Demo purposes only. You can add essential permissions and roles with your own cases.
          const permissions = ['canAdd', 'canDelete', 'canEdit', 'canRead'];
          this.permissonsSrv.loadPermissions(permissions);
          this.rolesSrv.addRoles({ ADMIN: permissions });

          // Tips: Alternative you can add permissions with role at the same time.
          // this.rolesSrv.addRolesWithPermissions({ ADMIN: permissions });

          resolve(null);
        });
    });
  }
}
