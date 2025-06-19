import { Routes } from '@angular/router';
import { UtilitiesCssGrid } from './css-grid/css-grid';
import { UtilitiesCssHelpers } from './css-helpers/css-helpers';

export const routes: Routes = [
  { path: 'css-grid', component: UtilitiesCssGrid },
  { path: 'css-helpers', component: UtilitiesCssHelpers },
];
