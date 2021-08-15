import { Injectable } from '@angular/core';
import { iif, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { TokenService } from '../authentication/token.service';
import { LoginService } from '../authentication/login.service';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(
    private token: TokenService,
    private menu: MenuService,
    private login: LoginService,
    private permissonsSrv: NgxPermissionsService,
    private rolesSrv: NgxRolesService
  ) {}

  /** Load the application only after get the menu or other essential informations such as roles and permissions. */
  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.token
        .changed()
        .pipe(
          switchMap(() => iif(() => this.token.valid(), this.login.menu(), of({ menu: [] }))),
          catchError(error => throwError(error))
        )
        .subscribe((response: any) => {
          this.menu.addNamespace(response.menu, 'menu');
          this.menu.set(response.menu);

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
