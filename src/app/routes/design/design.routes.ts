import { Routes } from '@angular/router';

import { DesignColors } from './colors/colors';
import { DesignIcons } from './icons/icons';

export const routes: Routes = [
  { path: 'colors', component: DesignColors },
  { path: 'icons', component: DesignIcons },
];
