import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  red = 0;
  green = 0;
  blue = 0;

  get swatchBackground() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }
}
