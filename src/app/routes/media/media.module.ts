import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MediaRoutingModule } from './media-routing.module';
import { MediaGalleryComponent } from './gallery/gallery.component';

const COMPONENTS = [MediaGalleryComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    MediaRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class MediaModule { }
