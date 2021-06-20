import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-permissions-role-switching',
  templateUrl: './role-switching.component.html',
  styleUrls: ['./role-switching.component.scss'],
})
export class PermissionsRoleSwitchingComponent implements OnInit, OnDestroy {
  currentRole = 'ADMIN';

  currentPermissions: string[];

  permissionsOfRole = {
    ADMIN: ['canAdd', 'canDelete', 'canEdit', 'canRead'],
    MANAGER: ['canAdd', 'canEdit', 'canRead'],
    GUEST: ['canRead'],
  };

  private readonly _destroy$ = new Subject<void>();

  constructor(private rolesSrv: NgxRolesService, private permissionsSrv: NgxPermissionsService) {}

  ngOnInit() {
    this.rolesSrv.roles$.pipe(takeUntil(this._destroy$)).subscribe(roles => {
      console.log(roles);
    });

    this.permissionsSrv.permissions$.pipe(takeUntil(this._destroy$)).subscribe(permissions => {
      console.log(permissions);
    });

    this.currentPermissions = Object.keys(this.permissionsSrv.getPermissions());
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onPermissionChange(e: MatButtonToggleChange) {
    this.currentPermissions = this.permissionsOfRole[this.currentRole];
    this.rolesSrv.flushRolesAndPermissions();
    this.rolesSrv.addRoleWithPermissions(this.currentRole, this.currentPermissions);
  }
}
