import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesKitchenSinkComponent } from './kitchen-sink/kitchen-sink.component';
import { TablesRemoteDataComponent } from './remote-data/remote-data.component';

const routes: Routes = [
  { path: 'kitchen-sink', component: TablesKitchenSinkComponent },
  { path: 'remote-data', component: TablesRemoteDataComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
