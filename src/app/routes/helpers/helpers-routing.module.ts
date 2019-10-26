import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpersCssClassComponent } from './css-class/css-class.component';

const routes: Routes = [{ path: 'css-class', component: HelpersCssClassComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpersRoutingModule {}
