import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent {
  constructor(private snackBar: MatSnackBar) {}

  openDiscoPartySnackBar() {
    this.snackBar.open('Disco party!', 'Dismiss', { duration: 5000 });
  }

  openNotificationSnackBar() {
    this.snackBar.open('Thank you for your support!', '', { duration: 2000 });
  }
}
