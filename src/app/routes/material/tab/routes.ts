import { Routes } from '@angular/router';

import {
  SunnyTabContentComponent,
  RainyTabContentComponent,
  FoggyTabContentComponent,
} from './tab.component';

export const TABS_DEMO_ROUTES: Routes = [
  { path: '', redirectTo: 'sunny-tab', pathMatch: 'full' },
  { path: 'sunny-tab', component: SunnyTabContentComponent },
  { path: 'rainy-tab', component: RainyTabContentComponent },
  { path: 'foggy-tab', component: FoggyTabContentComponent },
];
