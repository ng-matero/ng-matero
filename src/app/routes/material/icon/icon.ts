import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Breadcrumb } from '@shared';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  imports: [Breadcrumb, MatIconModule, MatButtonModule, MatCardModule],
})
export class IconDemo {
  private snackBar = inject(MatSnackBar);

  deleteIcon() {
    this.snackBar.open('Item deleted', '', { duration: 2000 });
  }
}
