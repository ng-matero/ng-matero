import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HelpersRoutingModule } from './helpers-routing.module';
import { HelpersCssClassComponent } from './css-class/css-class.component';

const COMPONENTS: any[] = [HelpersCssClassComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, HelpersRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class HelpersModule {}
