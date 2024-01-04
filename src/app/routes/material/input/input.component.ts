import { Component } from '@angular/core';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

const USD_TO_JPY = 110.29;

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    TextFieldModule,
  ],
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
