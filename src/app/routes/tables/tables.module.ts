import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TableRoutingModule } from './tables-routing.module';

import { BasicComponent } from './basic/basic.component';
import { BasicEditComponent } from './basic/edit/edit.component';

const COMPONENTS = [BasicComponent];
const COMPONENTS_DYNAMIC = [BasicEditComponent];

@NgModule({
  imports: [SharedModule, TableRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class TablesModule {}
