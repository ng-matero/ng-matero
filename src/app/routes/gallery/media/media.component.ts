import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  images: any[] = [];

  constructor() {
    for (let i = 1; i <= 20; i++) {
      this.images.push(i);
    }
  }

  ngOnInit() {}
}
