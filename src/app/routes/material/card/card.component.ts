import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  showProgress = false;

  constructor(private snackBar: MatSnackBar) {}

  openSnackbar(message: string) {
    this.snackBar.open(message, '', { duration: 2000 });
  }
}
