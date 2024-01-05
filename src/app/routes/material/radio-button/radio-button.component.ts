import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MatCardModule, MatRadioModule, FormsModule, NgFor],
})
export class RadioButtonComponent {
  favoriteSeason = 'Autumn';
  seasonOptions = ['Winter', 'Spring', 'Summer', 'Autumn'];
}
