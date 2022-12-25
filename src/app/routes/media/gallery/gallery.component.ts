import { Component } from '@angular/core';
import PhotoViewer from 'photoviewer';

@Component({
  selector: 'app-media-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class MediaGalleryComponent {
  dir = 'assets/images/pixabay/';
  images: any[] = [];

  constructor() {
    for (let i = 1; i <= 20; i++) {
      this.images.push({
        title: i,
        src: this.dir + i + '.jpg',
      });
    }
  }

  // Preview images
  preview(index: number) {
    const options: PhotoViewer.Options = { index };
    const viewer = new PhotoViewer(this.images, options);
  }
}
