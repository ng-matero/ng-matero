import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HelpersRoutingModule } from './helpers-routing.module';
import { HelpersCssClassComponent } from './css-class/css-class.component';

const COMPONENTS = [HelpersCssClassComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    HelpersRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class HelpersModule { }
