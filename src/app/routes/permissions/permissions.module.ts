import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsTestComponent } from './test/test.component';
import { PermissionsRouteGuardComponent } from './route-guard/route-guard.component';
import { PermissionsRoleSwitchingComponent } from './role-switching/role-switching.component';

const COMPONENTS: any[] = [
  PermissionsTestComponent,
  PermissionsRouteGuardComponent,
  PermissionsRoleSwitchingComponent,
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, PermissionsRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class PermissionsModule {}
