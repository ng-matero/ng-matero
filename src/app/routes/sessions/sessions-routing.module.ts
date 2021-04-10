import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Error403Component } from './403.component';
import { Error404Component } from './404.component';
import { Error500Component } from './500.component';

const routes: Routes = [
  { path: '403', component: Error403Component },
  { path: '404', component: Error404Component },
  { path: '500', component: Error500Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionsRoutingModule {}
