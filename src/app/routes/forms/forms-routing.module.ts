import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsElementsComponent } from './elements/elements.component';
import { FormsSelectComponent } from './select/select.component';
import { FormsDynamicComponent } from './dynamic/dynamic.component';
import { FormsDatetimeComponent } from './datetime/datetime.component';

const routes: Routes = [
  { path: 'elements', component: FormsElementsComponent },
  { path: 'dynamic', component: FormsDynamicComponent },
  { path: 'select', component: FormsSelectComponent },
  { path: 'datetime', component: FormsDatetimeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsRoutingModule {}
