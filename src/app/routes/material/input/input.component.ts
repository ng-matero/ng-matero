import { Component } from '@angular/core';

const USD_TO_JPY = 110.29;

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  firstName!: string;
  lastName!: string;
  password!: string;
  showPassword = false;
  email!: string;
  usd!: number;
  comment!: string;
  commentMax = 200;

  get passwordType() {
    return this.showPassword ? 'text' : 'password';
  }

  get passwordToggleLabel() {
    return this.showPassword ? 'Hide password' : 'Reveal password';
  }

  get passwordToggleIcon() {
    return this.showPassword ? 'visibility_off' : 'visibility';
  }

  get jpy() {
    return this.usd ? this.usd * USD_TO_JPY : this.usd;
  }
  set jpy(value) {
    this.usd = value ? value / USD_TO_JPY : value;
  }

  get commentCount() {
    return this.comment ? this.comment.length : 0;
  }
}
