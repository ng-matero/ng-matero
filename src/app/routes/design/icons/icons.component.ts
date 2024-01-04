import { Component, OnInit } from '@angular/core';

import { MAT_ICONS } from '@shared';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgFor, KeyValuePipe } from '@angular/common';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';

@Component({
  selector: 'app-design-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
  standalone: true,
  imports: [PageHeaderComponent, NgFor, MatCardModule, MatIconModule, KeyValuePipe],
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
