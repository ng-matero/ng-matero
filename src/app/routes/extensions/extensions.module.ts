import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ExtensionsRoutingModule } from './extensions-routing.module';
import { ExtensionsDialogComponent } from './dialog/dialog.component';

const COMPONENTS = [ExtensionsDialogComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, ExtensionsRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class ExtensionsModule {}
