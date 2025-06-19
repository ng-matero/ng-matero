import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Breadcrumb } from '@shared';

@Component({
  selector: 'app-ripple',
  templateUrl: './ripple.html',
  styleUrl: './ripple.scss',
  imports: [
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatCardModule,
    Breadcrumb,
  ],
})
export class RippleDemo {
  centered = false;
  disabled = false;
  unbounded = false;

  radius!: number;
  color!: string;
}
