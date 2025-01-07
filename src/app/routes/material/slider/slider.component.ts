import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  imports: [BreadcrumbComponent, MatCardModule, MatSliderModule, FormsModule],
})
export class SliderComponent {
  red = 0;
  green = 0;
  blue = 0;

  get swatchBackground() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
}
