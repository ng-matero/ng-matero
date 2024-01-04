import { Routes } from '@angular/router';

import { TablesKitchenSinkComponent } from './kitchen-sink/kitchen-sink.component';
import { TablesRemoteDataComponent } from './remote-data/remote-data.component';

export const routes: Routes = [
  { path: 'kitchen-sink', component: TablesKitchenSinkComponent },
  { path: 'remote-data', component: TablesRemoteDataComponent },
];
