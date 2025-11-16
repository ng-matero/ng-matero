import { Component, ViewEncapsulation, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import screenfull from 'screenfull';

import { Branding } from '../widgets/branding';
import { GithubButton } from '../widgets/github-button';
import { NotificationButton } from '../widgets/notification-button';
import { TranslateButton } from '../widgets/translate-button';
import { UserButton } from '../widgets/user-button';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    class: 'matero-header',
  },
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    Branding,
    GithubButton,
    NotificationButton,
    TranslateButton,
    UserButton,
  ],
})
export class Header {
  readonly showToggle = input(true);
  readonly showBranding = input(false);

  readonly toggleSidenav = output<void>();
  readonly toggleSidenavNotice = output<void>();

  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
}
