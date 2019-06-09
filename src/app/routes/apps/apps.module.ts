import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AppsRoutingModule } from './apps-routing.module';

import { MediaComponent } from './media/media.component';

@NgModule({
  imports: [CommonModule, SharedModule, AppsRoutingModule],
  declarations: [MediaComponent],
})
export class AppsModule {}
