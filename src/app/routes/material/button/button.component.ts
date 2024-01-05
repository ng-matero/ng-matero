import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MatButtonModule, MatIconModule],
})
export class ButtonComponent {
  counter = 0;

  constructor(public snackBar: MatSnackBar) {}

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  increase() {
    this.counter++;
    this.openSnackBar(`Click counter is set to ${this.counter}`);
  }
}
