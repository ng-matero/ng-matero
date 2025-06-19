import { Routes } from '@angular/router';

import { TablesKitchenSink } from './kitchen-sink/kitchen-sink';
import { TablesRemoteData } from './remote-data/remote-data';

export const routes: Routes = [
  { path: 'kitchen-sink', component: TablesKitchenSink },
  { path: 'remote-data', component: TablesRemoteData },
];
