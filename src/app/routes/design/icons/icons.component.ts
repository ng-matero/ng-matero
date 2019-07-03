import { Component, OnInit } from '@angular/core';
import { IconsService } from './icons.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  providers: [IconsService],
})
export class IconsComponent implements OnInit {
  icons: any;
  constructor(private iconsService: IconsService) {}

  ngOnInit() {
    this.icons = this.iconsService.icons;
  }
}
