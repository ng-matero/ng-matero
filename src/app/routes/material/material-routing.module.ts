import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardComponent } from './card/card.component';
import { DividerComponent } from './divider/divider.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { ListComponent } from './list/list.component';
import { StepperComponent } from './stepper/stepper.component';
import { TabComponent } from './tab/tab.component';
import { TreeComponent } from './tree/tree.component';

const routes: Routes = [
  {
    path: 'layout/card',
    component: CardComponent,
    data: { title: 'Card' },
  },
  {
    path: 'layout/divider',
    component: DividerComponent,
    data: { title: 'Divider' },
  },
  {
    path: 'layout/expansion-panel',
    component: ExpansionPanelComponent,
    data: { title: 'Expansion Panel' },
  },
  {
    path: 'layout/grid-list',
    component: GridListComponent,
    data: { title: 'Grid' },
  },
  {
    path: 'layout/list',
    component: ListComponent,
    data: { title: 'List' },
  },
  {
    path: 'layout/stepper',
    component: StepperComponent,
    data: { title: 'Stepper' },
  },
  {
    path: 'layout/tab',
    component: TabComponent,
    data: { title: 'Tab' },
  },
  {
    path: 'layout/tree',
    component: TreeComponent,
    data: { title: 'Tree' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialRoutingModule {}
