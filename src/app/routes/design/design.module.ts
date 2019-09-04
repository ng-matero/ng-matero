import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DesignRoutingModule } from './design-routing.module';

import { ColorsComponent } from './colors/colors.component';
import { IconsComponent } from './icons/icons.component';

const COMPONENTS = [ColorsComponent, IconsComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, DesignRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class DesignModule {}
