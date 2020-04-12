import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TableRoutingModule } from './tables-routing.module';

import { TablesKtchenSinkComponent } from './ktchen-sink/ktchen-sink.component';
import { TablesKtchenSinkEditComponent } from './ktchen-sink/edit/edit.component';
import { TablesRemoteDataComponent } from './remote-data/remote-data.component';

const COMPONENTS = [TablesKtchenSinkComponent, TablesRemoteDataComponent];
const COMPONENTS_DYNAMIC = [TablesKtchenSinkEditComponent];

@NgModule({
  imports: [SharedModule, TableRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class TablesModule {}
