import { Routes } from '@angular/router';

import { ProfileLayout } from './layout/layout';
import { ProfileOverview } from './overview/overview';
import { ProfileSettings } from './settings/settings';

export const routes: Routes = [
  {
    path: '',
    component: ProfileLayout,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: ProfileOverview },
      { path: 'settings', component: ProfileSettings },
    ],
  },
];
