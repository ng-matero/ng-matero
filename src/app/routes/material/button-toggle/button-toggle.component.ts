import { Component } from '@angular/core';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
})
export class ButtonToggleComponent {
  favoritePie = 'Apple';
  pieOptions = ['Apple', 'Cherry', 'Pecan', 'Lemon'];
}
