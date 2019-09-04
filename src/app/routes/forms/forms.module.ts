import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FormsRoutingModule } from './forms-routing.module';

import { ElementsComponent } from './elements/elements.component';
import { SelectsComponent } from './selects/selects.component';
import { DynamicComponent } from './dynamic/dynamic.component';

const COMPONENTS = [ElementsComponent, SelectsComponent, DynamicComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, FormsRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class FormsModule {}
