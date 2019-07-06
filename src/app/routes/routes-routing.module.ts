import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '../theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard', titleI18n: 'dashboard' },
      },
      {
        path: 'design',
        loadChildren: () =>
          import('./design/design.module').then(m => m.DesignModule),
        data: { title: 'Material', titleI18n: 'material' },
      },
      {
        path: 'material',
        loadChildren: () =>
          import('./material/material.module').then(m => m.MaterialModule),
        data: { title: 'Material', titleI18n: 'material' },
      },
      {
        path: 'gallery',
        loadChildren: () =>
          import('./gallery/gallery.module').then(m => m.GalleryModule),
        data: { title: 'Gallery', titleI18n: 'Gallery' },
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./forms/forms.module').then(m => m.FormsModule),
        data: { title: 'Forms', titleI18n: 'Forms' },
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./tables/tables.module').then(m => m.TablesModule),
        data: { title: 'Tables', titleI18n: 'Tables' },
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RoutesRoutingModule {}
