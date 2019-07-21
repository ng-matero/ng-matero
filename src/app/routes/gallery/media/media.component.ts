import { Component, OnInit } from '@angular/core';
import PhotoViewer from 'photoviewer';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
})
export class MediaComponent implements OnInit {
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

  ngOnInit() {}

  // Preview images
  preview(index: number) {
    const options: PhotoViewer.Options = {
      index,
    };

    const viewer = new PhotoViewer(this.images, options);
  }
}
