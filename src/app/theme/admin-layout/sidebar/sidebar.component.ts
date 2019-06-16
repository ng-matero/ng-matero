import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() showToggle = true;
  @Output() toggleCollapsed = new EventEmitter<void>();

  constructor() {}
}
