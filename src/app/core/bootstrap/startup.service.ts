import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { MenuService } from './menu.service';
import { AuthService, Menu } from '@core/authentication';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(
    private authService: AuthService,
    private menuService: MenuService,
    private permissonsService: NgxPermissionsService,
    private rolesService: NgxRolesService
  ) {}

  /**
   * Load the application only after get the menu or other essential informations
   * such as permissions and roles.
   */
  load() {
    return new Promise((resolve, reject) => {
      this.authService
        .onChange()
        .pipe(
          // In a real app, you should get permissions and roles from the user information.
          tap(response => this.setPermissions()),
          switchMap(authenticated => (authenticated ? this.authService.menu() : of({ menu: [] }))),
          tap(response => this.setMenu(response))
        )
        .subscribe(
          () => resolve(null),
          () => resolve(null)
        );
    });
  }

  private setMenu(response: { menu: Menu[] }) {
    this.menuService.addNamespace(response.menu, 'menu');
    this.menuService.set(response.menu);
  }

  private setPermissions() {
    // Demo purposes only. You can add essential permissions and roles with your own cases.
    const permissions = ['canAdd', 'canDelete', 'canEdit', 'canRead'];
    this.permissonsService.loadPermissions(permissions);
    this.rolesService.flushRoles();
    this.rolesService.addRoles({ ADMIN: permissions });

    // Tips: Alternative you can add permissions with role at the same time.
    // this.rolesService.addRolesWithPermissions({ ADMIN: permissions });
  }
}
