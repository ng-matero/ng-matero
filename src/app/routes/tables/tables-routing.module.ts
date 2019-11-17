import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableBasicComponent } from './basic/basic.component';
import { TablesAdvancedComponent } from './advanced/advanced.component';

const routes: Routes = [
  { path: 'basic', component: TableBasicComponent, data: { title: 'Table Basic' } },
  { path: 'advanced', component: TablesAdvancedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
