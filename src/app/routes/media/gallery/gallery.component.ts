import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
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
