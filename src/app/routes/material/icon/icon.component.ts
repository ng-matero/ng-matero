import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  constructor(private snackBar: MatSnackBar) {}

  deleteIcon() {
    this.snackBar.open('Item deleted', '', { duration: 2000 });
  }
}
