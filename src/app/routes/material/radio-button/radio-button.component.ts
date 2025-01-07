import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
  imports: [BreadcrumbComponent, MatCardModule, MatRadioModule, FormsModule],
})
export class RadioButtonComponent {
  favoriteSeason = 'Autumn';
  seasonOptions = ['Winter', 'Spring', 'Summer', 'Autumn'];
}
