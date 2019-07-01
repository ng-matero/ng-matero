import { Component, OnInit, HostListener } from '@angular/core';
import * as screenfull from 'screenfull';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
})
export class FullscreenComponent implements OnInit {
  @HostListener('click')
  _click() {
    // if (screenfull.enabled) {
    //   screenfull.toggle();
    // }
  }

  constructor() {}

  ngOnInit() {}
}
