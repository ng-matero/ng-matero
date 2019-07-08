import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SessionsRoutingModule } from './sessions-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, SessionsRoutingModule],
})
export class SessionsModule {}
