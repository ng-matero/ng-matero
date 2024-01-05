import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MatCardModule, MatButtonModule],
})
export class CardComponent {
  showProgress = false;

  constructor(private snackBar: MatSnackBar) {}

  openSnackbar(message: string) {
    this.snackBar.open(message, '', { duration: 2000 });
  }
}
