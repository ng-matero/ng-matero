import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.scss',
  imports: [BreadcrumbComponent, MatProgressSpinnerModule, MatCardModule],
})
export class ProgressSpinnerComponent {
  portionValue = 60;
}
