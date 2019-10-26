import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignColorsComponent } from './colors/colors.component';
import { DesignIconsComponent } from './icons/icons.component';

const routes: Routes = [
  { path: 'colors', component: DesignColorsComponent, data: { title: 'Material Colors' } },
  { path: 'icons', component: DesignIconsComponent, data: { title: 'Material Icons' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesignRoutingModule {}
