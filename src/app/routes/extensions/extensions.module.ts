import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ExtensionsRoutingModule } from './extensions-routing.module';
import { ExtensionsAlertComponent } from './alert/alert.component';
import { ExtensionsDialogComponent } from './dialog/dialog.component';
import { ExtensionsProgressComponent } from './progress/progress.component';

const COMPONENTS = [
  ExtensionsAlertComponent,
  ExtensionsDialogComponent,
  ExtensionsProgressComponent,
];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, ExtensionsRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class ExtensionsModule {}
