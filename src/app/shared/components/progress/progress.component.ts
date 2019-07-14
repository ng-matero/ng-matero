import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  host: {
    class: 'matero-progress',
  },
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProgressComponent implements OnInit {
  @Input() value = 0;

  constructor() {}

  ngOnInit() {}
}
