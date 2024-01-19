import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { BrandingComponent } from '../widgets/branding.component';
import { UserPanelComponent } from './user-panel.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatSlideToggleModule, BrandingComponent, SidemenuComponent, UserPanelComponent],
})
export class SidebarComponent {
  @Input() showToggle = true;
  @Input() showUser = true;
  @Input() showHeader = true;
  @Input() toggleChecked = false;

  @Output() toggleCollapsed = new EventEmitter<void>();
}
