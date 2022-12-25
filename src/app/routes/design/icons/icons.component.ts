import { Component, OnInit } from '@angular/core';

import { MAT_ICONS } from '@shared';

@Component({
  selector: 'app-design-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
})
export class DesignIconsComponent implements OnInit {
  icons!: { [key: string]: string[] };

  constructor() {}

  ngOnInit() {
    this.icons = MAT_ICONS;
  }

  trackByIcon(index: number, icon: { key: string; value: string[] }): string {
    return icon.key;
  }
}
