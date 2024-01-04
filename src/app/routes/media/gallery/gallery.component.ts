import { Component, OnInit } from '@angular/core';
import { MtxPhotoviewerModule } from '@ng-matero/extensions/photoviewer';
import { MatLineModule } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';

@Component({
  selector: 'app-media-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  standalone: true,
  imports: [PageHeaderComponent, MatGridListModule, NgFor, MatLineModule, MtxPhotoviewerModule],
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
