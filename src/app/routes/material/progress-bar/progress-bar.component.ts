import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MatProgressBarModule],
})
export class ProgressBarComponent {
  surveyProgress = 30;
  videoPlayValue = 20;
  videoBufferValue = 60;
}
