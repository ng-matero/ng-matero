import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Error403Component } from './403.component';
import { Error404Component } from './404.component';
import { Error500Component } from './500.component';

const routes: Routes = [
  {
    path: '403',
    component: Error403Component,
    data: { title: '403 Forbidden', titleI18n: '403 Forbidden' },
  },
  {
    path: '404',
    component: Error404Component,
    data: { title: '404 Not Found', titleI18n: '404 Not Found' },
  },
  {
    path: '500',
    component: Error500Component,
    data: { title: '500 Error', titleI18n: '500 Error' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionsRoutingModule {}
