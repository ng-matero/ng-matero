import { Component, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { UserPanelComponent } from './user-panel.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrandingComponent } from '../widgets/branding.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [NgIf, BrandingComponent, MatSlideToggleModule, UserPanelComponent, SidemenuComponent],
})
export class SidebarComponent {
  @Input() showToggle = true;
  @Input() showUser = true;
  @Input() showHeader = true;
  @Input() toggleChecked = false;

  @Output() toggleCollapsed = new EventEmitter<void>();
}
