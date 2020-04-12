import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesKtchenSinkComponent } from './ktchen-sink/ktchen-sink.component';
import { TablesRemoteDataComponent } from './remote-data/remote-data.component';

const routes: Routes = [
  { path: 'kitchen-sink', component: TablesKtchenSinkComponent, data: { title: 'Kitchen Sink' } },
  { path: 'remote-data', component: TablesRemoteDataComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
