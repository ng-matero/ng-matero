import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';

import { Breadcrumb } from '@shared';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.html',
  styleUrl: './radio-button.scss',
  imports: [Breadcrumb, MatCardModule, MatRadioModule, FormsModule],
})
export class RadioButtonDemo {
  favoriteSeason = 'Autumn';
  seasonOptions = ['Winter', 'Spring', 'Summer', 'Autumn'];
}
