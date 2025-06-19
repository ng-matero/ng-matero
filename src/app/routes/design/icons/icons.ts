import { KeyValuePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MAT_ICONS, PageHeader } from '@shared';

@Component({
  selector: 'app-design-icons',
  templateUrl: './icons.html',
  styleUrl: './icons.scss',
  imports: [KeyValuePipe, MatCardModule, MatIconModule, PageHeader],
})
export class DesignIcons implements OnInit {
  icons!: Record<string, string[]>;

  ngOnInit() {
    this.icons = MAT_ICONS;
  }

  trackByIcon(index: number, icon: { key: string; value: string[] }): string {
    return icon.key;
  }
}
