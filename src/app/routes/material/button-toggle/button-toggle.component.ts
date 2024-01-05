import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
  standalone: true,
  imports: [NgFor, FormsModule, BreadcrumbComponent, MatButtonToggleModule, MatIconModule],
})
export class ButtonToggleComponent {
  favoritePie = 'Apple';
  pieOptions = ['Apple', 'Cherry', 'Pecan', 'Lemon'];
}
