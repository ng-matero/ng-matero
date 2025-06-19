import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { Breadcrumb } from '@shared';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss',
  imports: [Breadcrumb, MatProgressBarModule, MatCardModule],
})
export class ProgressBarDemo {
  surveyProgress = 30;
  videoPlayValue = 20;
  videoBufferValue = 60;
}
