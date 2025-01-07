import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  imports: [BreadcrumbComponent, MatProgressBarModule, MatCardModule],
})
export class ProgressBarComponent {
  surveyProgress = 30;
  videoPlayValue = 20;
  videoBufferValue = 60;
}
