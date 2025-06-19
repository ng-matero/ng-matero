import { Routes } from '@angular/router';

import { FormsDatetime } from './datetime/datetime';
import { FormsDynamic } from './dynamic/dynamic';
import { FormsElements } from './elements/elements';
import { FormsSelect } from './select/select';

export const routes: Routes = [
  { path: 'elements', component: FormsElements },
  { path: 'dynamic', component: FormsDynamic },
  { path: 'select', component: FormsSelect },
  { path: 'datetime', component: FormsDatetime },
];
