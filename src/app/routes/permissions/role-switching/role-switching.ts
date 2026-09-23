import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

import { PageHeader } from '@shared';

@Component({
  selector: 'app-permissions-role-switching',
  templateUrl: './role-switching.html',
  styleUrl: './role-switching.scss',
  imports: [JsonPipe, FormsModule, MatButtonToggleModule, MatCardModule, PageHeader],
})
export class PermissionsRoleSwitching implements OnInit {
  private readonly rolesSrv = inject(NgxRolesService);
  private readonly permissionsSrv = inject(NgxPermissionsService);
  private readonly destroyRef = inject(DestroyRef);

  currentRole = '';

  currentPermissions: string[] = [];

  permissionsOfRole: Record<string, string[]> = {
    ADMIN: ['canAdd', 'canDelete', 'canEdit', 'canRead'],
    MANAGER: ['canAdd', 'canEdit', 'canRead'],
    GUEST: ['canRead'],
  };

  ngOnInit() {
    this.currentRole = Object.keys(this.rolesSrv.getRoles())[0];
    this.currentPermissions = Object.keys(this.permissionsSrv.getPermissions());

    this.rolesSrv.roles$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(roles => {
      console.log(roles);
    });
    this.permissionsSrv.permissions$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(permissions => {
        console.log(permissions);
      });
  }

  onPermissionChange() {
    this.currentPermissions = this.permissionsOfRole[this.currentRole];
    this.rolesSrv.flushRolesAndPermissions();
    this.rolesSrv.addRoleWithPermissions(this.currentRole, this.currentPermissions);
  }
}
