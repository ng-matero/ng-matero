import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Breadcrumb } from '@shared';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.html',
  styleUrl: './button-toggle.scss',
  imports: [FormsModule, Breadcrumb, MatButtonToggleModule, MatIconModule, MatCardModule],
})
export class ButtonToggleDemo {
  favoritePie = 'Apple';
  pieOptions = ['Apple', 'Cherry', 'Pecan', 'Lemon'];
}
