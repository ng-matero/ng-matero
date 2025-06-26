import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authGuard } from '@core';
import { environment } from '@env/environment';

import { AdminLayout } from '../theme/admin-layout/admin-layout';
import { AuthLayout } from '../theme/auth-layout/auth-layout';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './sessions/login/login';
import { Register } from './sessions/register/register';
import { Error403 } from './sessions/error-403';
import { Error404 } from './sessions/error-404';
import { Error500 } from './sessions/error-500';

const routes: Routes = [
  {
    path: '',
    component: AdminLayout,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: '403', component: Error403 },
      { path: '404', component: Error404 },
      { path: '500', component: Error500 },
    ],
  },
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ],
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
