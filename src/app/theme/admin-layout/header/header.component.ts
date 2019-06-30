import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  HostBinding,
} from '@angular/core';

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
}
