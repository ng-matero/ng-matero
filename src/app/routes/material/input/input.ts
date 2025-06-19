import { TextFieldModule } from '@angular/cdk/text-field';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Breadcrumb } from '@shared';

const USD_TO_JPY = 110.29;

@Component({
  selector: 'app-input',
  templateUrl: './input.html',
  styleUrl: './input.scss',
  imports: [
    TextFieldModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    Breadcrumb,
  ],
})
export class InputDemo {
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
