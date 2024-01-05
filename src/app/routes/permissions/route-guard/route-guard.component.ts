import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-permissions-route-guard',
  templateUrl: './route-guard.component.html',
  styleUrls: ['./route-guard.component.scss'],
  standalone: true,
  imports: [JsonPipe, FormsModule, MatButtonToggleModule, PageHeaderComponent],
})
export class PermissionsRouteGuardComponent implements OnInit {
  currentRole!: string;

  currentPermissions!: string[];

  permissionsOfRole: any = {
    ADMIN: ['canAdd', 'canDelete', 'canEdit', 'canRead'],
    MANAGER: ['canAdd', 'canEdit', 'canRead'],
    GUEST: ['canRead'],
  };

  constructor(
    private rolesSrv: NgxRolesService,
    private permissionsSrv: NgxPermissionsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentRole = Object.keys(this.rolesSrv.getRoles())[0];
    this.currentPermissions = Object.keys(this.permissionsSrv.getPermissions());
  }

  onPermissionChange() {
    this.currentPermissions = this.permissionsOfRole[this.currentRole];
    this.rolesSrv.flushRolesAndPermissions();
    this.rolesSrv.addRoleWithPermissions(this.currentRole, this.currentPermissions);

    this.router.navigateByUrl('/dashboard');
  }
}
