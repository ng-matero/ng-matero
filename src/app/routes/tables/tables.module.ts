import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TableRoutingModule } from './tables-routing.module';

import { TableBasicComponent } from './basic/basic.component';
import { TableBasicEditComponent } from './basic/edit/edit.component';

const COMPONENTS = [TableBasicComponent];
const COMPONENTS_DYNAMIC = [TableBasicEditComponent];

@NgModule({
  imports: [SharedModule, TableRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class TablesModule {}
