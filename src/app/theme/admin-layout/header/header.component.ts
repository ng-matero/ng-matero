import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  HostBinding,
} from '@angular/core';
import * as screenfull from 'screenfull';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() showBranding = false;

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleNotificationSidenav = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}
  // TODO:
  toggleFullscreen() {
    // tslint:disable-next-line: no-string-literal
    if (screenfull['enabled']) {
      // tslint:disable-next-line: no-string-literal
      screenfull['toggle']();
    }
  }
}
