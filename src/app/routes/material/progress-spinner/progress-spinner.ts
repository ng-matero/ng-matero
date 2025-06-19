import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Breadcrumb } from '@shared';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.html',
  styleUrl: './progress-spinner.scss',
  imports: [Breadcrumb, MatProgressSpinnerModule, MatCardModule],
})
export class ProgressSpinnerDemo {
  portionValue = 60;
}
