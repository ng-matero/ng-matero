import { Component, EventEmitter, Output, ViewEncapsulation, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Sidemenu } from '../sidemenu/sidemenu';
import { Branding } from '../widgets/branding';
import { UserPanel } from './user-panel';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    Branding,
    Sidemenu,
    UserPanel,
  ],
})
export class Sidebar {
  readonly showToggle = input(true);
  readonly showUser = input(true);
  readonly showHeader = input(true);
  readonly toggleChecked = input(false);

  @Output() toggleCollapsed = new EventEmitter<void>();
  @Output() closeSidenav = new EventEmitter<void>();
}
