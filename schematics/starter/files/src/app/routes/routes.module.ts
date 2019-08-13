import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoutesRoutingModule } from './routes-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';

@NgModule({
  imports: [SharedModule, RoutesRoutingModule],
  declarations: [DashboardComponent, LoginComponent, RegisterComponent],
  entryComponents: [],
})
export class RoutesModule {}
