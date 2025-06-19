import { Routes } from '@angular/router';
import { ngxPermissionsGuard } from 'ngx-permissions';
import { PermissionsRoleSwitching } from './role-switching/role-switching';
import { PermissionsRouteGuard } from './route-guard/route-guard';
import { PermissionsTest } from './test/test';

export const routes: Routes = [
  { path: 'role-switching', component: PermissionsRoleSwitching },
  {
    path: 'route-guard',
    component: PermissionsRouteGuard,
    canActivate: [ngxPermissionsGuard],
    data: {
      permissions: {
        except: 'GUEST',
        redirectTo: '/dashboard',
      },
    },
  },
  {
    path: 'test',
    component: PermissionsTest,
    canActivate: [ngxPermissionsGuard],
    data: {
      permissions: {
        only: 'ADMIN',
        redirectTo: '/dashboard',
      },
    },
  },
];
