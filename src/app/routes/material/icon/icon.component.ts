import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  standalone: true,
  imports: [BreadcrumbComponent, MatIconModule, MatButtonModule],
})
export class IconComponent {
  constructor(private snackBar: MatSnackBar) {}

  deleteIcon() {
    this.snackBar.open('Item deleted', '', { duration: 2000 });
  }
}
