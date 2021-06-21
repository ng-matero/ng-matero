import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionsRoleSwitchingComponent } from './role-switching/role-switching.component';
import { PermissionsRouteGuardComponent } from './route-guard/route-guard.component';
import { PermissionsTestComponent } from './test/test.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  { path: 'role-switching', component: PermissionsRoleSwitchingComponent },
  {
    path: 'route-guard',
    component: PermissionsRouteGuardComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        except: 'GUEST',
        redirectTo: '/dashboard',
      },
    },
  },
  {
    path: 'test',
    component: PermissionsTestComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'ADMIN',
        redirectTo: '/dashboard',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionsRoutingModule {}
