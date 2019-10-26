import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DesignRoutingModule } from './design-routing.module';

import { DesignColorsComponent } from './colors/colors.component';
import { DesignIconsComponent } from './icons/icons.component';

const COMPONENTS = [DesignColorsComponent, DesignIconsComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, DesignRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class DesignModule {}
