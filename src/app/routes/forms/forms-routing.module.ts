import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElementsComponent } from './elements/elements.component';
import { SelectsComponent } from './selects/selects.component';

const routes: Routes = [
  {
    path: 'elements',
    component: ElementsComponent,
    data: { title: 'Form Elements' },
  },
  {
    path: 'ng-select',
    component: SelectsComponent,
    data: { title: 'Ng Select' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsRoutingModule {}
