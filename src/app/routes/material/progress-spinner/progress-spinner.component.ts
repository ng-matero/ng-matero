import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MatProgressSpinnerModule],
})
export class ProgressSpinnerComponent {
  portionValue = 60;
}
