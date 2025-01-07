import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrl: './slide-toggle.component.scss',
  imports: [FormsModule, MatCardModule, MatSlideToggleModule, MatButtonModule, BreadcrumbComponent],
})
export class SlideToggleComponent {
  private snackBar = inject(MatSnackBar);

  emailToggle = true;
  termsToggle = false;
  musicToggle = false;

  onFormSubmit() {
    this.snackBar.open('Terms and condistions accepted!', '', { duration: 2000 });
  }
}
