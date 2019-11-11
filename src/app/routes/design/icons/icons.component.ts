import { Component, OnInit } from '@angular/core';
import { DesignIconsService } from './icons.service';

import { MAT_ICONS } from '@shared';

@Component({
  selector: 'app-design-icons',
  templateUrl: './icons.component.html',
  providers: [DesignIconsService],
})
export class DesignIconsComponent implements OnInit {
  icons: any;
  constructor(private iconsSrv: DesignIconsService) {}

  ngOnInit() {
    this.icons = MAT_ICONS;
  }

  trackByIcon(index: number, icon: { key: string; value: {} }): string {
    return icon.key;
  }
}
