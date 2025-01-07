import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-ripple',
  templateUrl: './ripple.component.html',
  styleUrl: './ripple.component.scss',
  imports: [
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatCardModule,
    BreadcrumbComponent,
  ],
})
export class RippleComponent {
  centered = false;
  disabled = false;
  unbounded = false;

  radius!: number;
  color!: string;
}
