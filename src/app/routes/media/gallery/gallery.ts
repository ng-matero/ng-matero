import { Component, OnInit } from '@angular/core';
import { MatLineModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MtxPhotoviewerModule } from '@ng-matero/extensions/photoviewer';

import { PageHeader } from '@shared';

@Component({
  selector: 'app-media-gallery',
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
  imports: [MatGridListModule, MatLineModule, MtxPhotoviewerModule, PageHeader],
})
export class MediaGallery implements OnInit {
  dir = 'images/pixabay/';
  images: any[] = [];

  ngOnInit(): void {
    for (let i = 1; i <= 20; i++) {
      this.images.push({
        title: i,
        src: this.dir + i + '.jpg',
      });
    }
  }
}
