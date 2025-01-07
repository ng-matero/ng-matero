import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrl: './button-toggle.component.scss',
  imports: [FormsModule, BreadcrumbComponent, MatButtonToggleModule, MatIconModule, MatCardModule],
})
export class ButtonToggleComponent {
  favoritePie = 'Apple';
  pieOptions = ['Apple', 'Cherry', 'Pecan', 'Lemon'];
}
