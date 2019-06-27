import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { GalleryRoutingModule } from './gallery-routing.module';

import { MediaComponent } from './media/media.component';

@NgModule({
  imports: [CommonModule, SharedModule, GalleryRoutingModule],
  declarations: [MediaComponent],
})
export class GalleryModule {}
