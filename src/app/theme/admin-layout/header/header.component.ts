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
  @HostBinding('class.valid') a = true;

  @Input() collapsed = false;
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleNotificationSidenav = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}
}
