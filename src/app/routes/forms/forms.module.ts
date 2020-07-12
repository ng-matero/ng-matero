import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FormsRoutingModule } from './forms-routing.module';

import { FormsElementsComponent } from './elements/elements.component';
import { FormsSelectComponent } from './select/select.component';
import { FormsDynamicComponent } from './dynamic/dynamic.component';

const COMPONENTS = [FormsElementsComponent, FormsSelectComponent, FormsDynamicComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, FormsRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class FormsModule {}
