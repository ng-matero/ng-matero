import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { GalleryRoutingModule } from './gallery-routing.module';

import { MediaComponent } from './media/media.component';

const COMPONENTS = [MediaComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [SharedModule, GalleryRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class GalleryModule {}
