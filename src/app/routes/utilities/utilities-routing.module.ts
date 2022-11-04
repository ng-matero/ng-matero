import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilitiesCssHelpersComponent } from './css-helpers/css-helpers.component';
import { UtilitiesCssGridComponent } from './css-grid/css-grid.component';

const routes: Routes = [
  { path: 'css-grid', component: UtilitiesCssGridComponent },
  { path: 'css-helpers', component: UtilitiesCssHelpersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilitiesRoutingModule {}
