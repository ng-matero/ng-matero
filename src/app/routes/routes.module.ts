import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoutesRoutingModule } from './routes-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [SharedModule, RoutesRoutingModule],
  declarations: [DashboardComponent],
  entryComponents: [],
})
export class RoutesModule {}
