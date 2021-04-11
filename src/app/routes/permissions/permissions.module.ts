import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsTestComponent } from './test/test.component';

const COMPONENTS = [PermissionsTestComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, PermissionsRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class PermissionsModule {}
