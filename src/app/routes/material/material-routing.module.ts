import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardComponent } from './card/card.component';
import { GridComponent } from './grid/grid.component';

const routes: Routes = [
  {
    path: 'layout/card',
    component: CardComponent,
    data: { title: 'Card' },
  },
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
