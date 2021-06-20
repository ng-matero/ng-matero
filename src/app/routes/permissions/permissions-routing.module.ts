import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionsTestComponent } from './test/test.component';
import { PermissionsRouteGuardComponent } from './route-guard/route-guard.component';
import { PermissionsRoleSwitchingComponent } from './role-switching/role-switching.component';

const routes: Routes = [
  { path: 'test', component: PermissionsTestComponent },
  { path: 'route-guard', component: PermissionsRouteGuardComponent },
  { path: 'role-switching', component: PermissionsRoleSwitchingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionsRoutingModule {}
