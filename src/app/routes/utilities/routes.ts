import { Routes } from '@angular/router';
import { UtilitiesCssGridComponent } from './css-grid/css-grid.component';
import { UtilitiesCssHelpersComponent } from './css-helpers/css-helpers.component';

export const routes: Routes = [
  { path: 'css-grid', component: UtilitiesCssGridComponent },
  { path: 'css-helpers', component: UtilitiesCssHelpersComponent },
];
