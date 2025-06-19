import { Routes } from '@angular/router';

import { SunnyTabContent, RainyTabContent, FoggyTabContent } from './tab';

export const TABS_DEMO_ROUTES: Routes = [
  { path: '', redirectTo: 'sunny-tab', pathMatch: 'full' },
  { path: 'sunny-tab', component: SunnyTabContent },
  { path: 'rainy-tab', component: RainyTabContent },
  { path: 'foggy-tab', component: FoggyTabContent },
];
