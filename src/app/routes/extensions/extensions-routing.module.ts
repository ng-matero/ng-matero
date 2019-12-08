import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtensionsAlertComponent } from './alert/alert.component';
import { ExtensionsDialogComponent } from './dialog/dialog.component';
import { ExtensionsProgressComponent } from './progress/progress.component';

const routes: Routes = [
  { path: 'alert', component: ExtensionsAlertComponent },
  { path: 'dialog', component: ExtensionsDialogComponent },
  { path: 'progress', component: ExtensionsProgressComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtensionsRoutingModule {}
