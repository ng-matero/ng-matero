import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
})
export class SlideToggleComponent {
  emailToggle = true;
  termsToggle = false;
  musicToggle = false;

  constructor(private snackBar: MatSnackBar) {}

  onFormSubmit() {
    this.snackBar.open('Terms and condistions accepted!', '', { duration: 2000 });
  }
}
