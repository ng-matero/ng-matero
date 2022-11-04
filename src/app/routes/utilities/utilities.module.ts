import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UtilitiesRoutingModule } from './utilities-routing.module';
import { UtilitiesCssHelpersComponent } from './css-helpers/css-helpers.component';
import { UtilitiesCssGridComponent } from './css-grid/css-grid.component';

const COMPONENTS: any[] = [UtilitiesCssHelpersComponent, UtilitiesCssGridComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, UtilitiesRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class UtilitiesModule {}
