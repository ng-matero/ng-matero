import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MenuService } from './menu.service';
import { SettingsService } from './settings.service';
import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(
    private menu: MenuService,
    private http: HttpClient,
    private settings: SettingsService,
    private rolesSrv: NgxRolesService,
    private permissonsSrv: NgxPermissionsService
  ) {}

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get('assets/data/menu.json?_t=' + Date.now())
        .pipe(
          catchError(res => {
            resolve(null);
            return throwError(res);
          })
        )
        .subscribe(
          (res: any) => {
            this.menu.recursMenuForTranslation(res.menu, 'menu');
            this.menu.set(res.menu);

            // Refresh user info. In a real app, user data will be fetched from API.
            this.settings.setUser({
              id: 1,
              name: 'Zongbin',
              email: 'nzb329@163.com',
              avatar: './assets/images/avatar.jpg',
            });

            // Demo purposes only. You can add essential permissions and roles with your own cases.
            const permissions = ['canAdd', 'canDelete', 'canEdit', 'canRead'];
            this.permissonsSrv.loadPermissions(permissions);
            this.rolesSrv.addRoles({ ADMIN: permissions });

            // Tips: Alternative you can add permissions with role at the same time
            // this.rolesSrv.addRolesWithPermissions({ ADMIN: permissions });
          },
          () => reject(),
          () => resolve(null)
        );
    });
  }
}
