import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Breadcrumb } from '@shared';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.html',
  styleUrl: './slide-toggle.scss',
  imports: [FormsModule, MatCardModule, MatSlideToggleModule, MatButtonModule, Breadcrumb],
})
export class SlideToggleDemo {
  private snackBar = inject(MatSnackBar);

  emailToggle = true;
  termsToggle = false;
  musicToggle = false;

  onFormSubmit() {
    this.snackBar.open('Terms and condistions accepted!', '', { duration: 2000 });
  }
}
