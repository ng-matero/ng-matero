import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsElementsComponent } from './elements/elements.component';
import { FormsSelectsComponent } from './selects/selects.component';
import { FormsDynamicComponent } from './dynamic/dynamic.component';

const routes: Routes = [
  { path: 'elements', component: FormsElementsComponent, data: { title: 'Form Elements' } },
  { path: 'ng-select', component: FormsSelectsComponent, data: { title: 'Ng Select' } },
  { path: 'dynamic', component: FormsDynamicComponent, data: { title: 'Dynamic Form' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsRoutingModule {}
