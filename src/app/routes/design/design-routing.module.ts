import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorsComponent } from './colors/colors.component';
import { IconsComponent } from './icons/icons.component';

const routes: Routes = [
  { path: 'colors', component: ColorsComponent, data: { title: 'Material Colors' } },
  { path: 'icons', component: IconsComponent, data: { title: 'Material Icons' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesignRoutingModule {}
