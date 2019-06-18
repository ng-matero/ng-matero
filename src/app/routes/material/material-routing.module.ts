import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GridComponent } from './grid/grid.component';

const routes: Routes = [
  {
    path: 'layout/grid',
    component: GridComponent,
    data: { title: 'Grid' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialRoutingModule {}
