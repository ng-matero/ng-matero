import { Component, OnInit } from '@angular/core';
import { DesignIconsService } from './icons.service';

@Component({
  selector: 'app-design-icons',
  templateUrl: './icons.component.html',
  providers: [DesignIconsService],
})
export class DesignIconsComponent implements OnInit {
  icons: any;
  constructor(private iconsService: DesignIconsService) {}

  ngOnInit() {
    this.icons = this.iconsService.icons;
  }
}
