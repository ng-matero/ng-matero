import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Breadcrumb } from '@shared';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.scss',
  imports: [Breadcrumb, MatCardModule, MatButtonModule],
})
export class CardDemo {
  private snackBar = inject(MatSnackBar);

  showProgress = false;

  openSnackbar(message: string) {
    this.snackBar.open(message, '', { duration: 2000 });
  }
}
