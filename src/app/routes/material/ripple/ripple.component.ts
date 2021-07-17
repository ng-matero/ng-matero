import { Component } from '@angular/core';

@Component({
  selector: 'app-ripple',
  templateUrl: './ripple.component.html',
  styleUrls: ['./ripple.component.scss'],
})
export class RippleComponent {
  centered = false;
  disabled = false;
  unbounded = false;

  radius!: number;
  color!: string;
}
