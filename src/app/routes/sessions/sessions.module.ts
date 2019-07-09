import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SessionsRoutingModule } from './sessions-routing.module';

import { Error403Component } from './403/403.component';
import { Error404Component } from './404/404.component';
import { Error500Component } from './500/500.component';

@NgModule({
  declarations: [Error404Component, Error403Component, Error500Component],
  imports: [CommonModule, SharedModule, SessionsRoutingModule],
})
export class SessionsModule {}
