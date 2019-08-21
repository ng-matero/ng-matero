import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
  surveyProgress: number = 30;
  videoPlayValue: number = 20;
  videoBufferValue: number = 60;
}
