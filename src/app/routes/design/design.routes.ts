import { Routes } from '@angular/router';

import { DesignColorsComponent } from './colors/colors.component';
import { DesignIconsComponent } from './icons/icons.component';

export const routes: Routes = [
  { path: 'colors', component: DesignColorsComponent },
  { path: 'icons', component: DesignIconsComponent },
];
