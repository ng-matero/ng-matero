import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtensionsDialogComponent } from './dialog/dialog.component';

const routes: Routes = [{ path: 'dialog', component: ExtensionsDialogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtensionsRoutingModule {}
