import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PermissionsRoutingModule } from './permissions-routing.module';

const COMPONENTS = [];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    PermissionsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class PermissionsModule { }
