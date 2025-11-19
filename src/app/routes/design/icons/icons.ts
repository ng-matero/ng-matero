import { KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MAT_ICONS, PageHeader } from '@shared';

@Component({
  selector: 'app-design-icons',
  templateUrl: './icons.html',
  styleUrl: './icons.scss',
  imports: [KeyValuePipe, MatCardModule, MatIconModule, PageHeader],
})
export class DesignIcons {
  icons: Record<string, string[]> = MAT_ICONS;
}
