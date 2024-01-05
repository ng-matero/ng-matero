import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatLineModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MtxPhotoviewerModule } from '@ng-matero/extensions/photoviewer';

import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-media-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  standalone: true,
  imports: [NgFor, MatGridListModule, MatLineModule, MtxPhotoviewerModule, PageHeaderComponent],
})
export class MediaGalleryComponent implements OnInit {
  dir = 'assets/images/pixabay/';
  images: any[] = [];

  constructor() {}

  ngOnInit(): void {
    for (let i = 1; i <= 20; i++) {
      this.images.push({
        title: i,
        src: this.dir + i + '.jpg',
      });
    }
  }
}
