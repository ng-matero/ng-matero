import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MediaRoutingModule } from './media-routing.module';
import { MediaGalleryComponent } from './gallery/gallery.component';

const COMPONENTS: any[] = [MediaGalleryComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, MediaRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class MediaModule {}
