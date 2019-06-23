import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
})
export class SlideToggleComponent implements OnInit {
  color = 'accent';
  checked = false;
  disabled = false;

  constructor() {}

  ngOnInit() {}
}
