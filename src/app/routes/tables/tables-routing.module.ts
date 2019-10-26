import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableBasicComponent } from './basic/basic.component';

const routes: Routes = [
  { path: 'basic', component: TableBasicComponent, data: { title: 'Table Basic' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
