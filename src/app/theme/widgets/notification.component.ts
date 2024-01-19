import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-notification',
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu">
      <mat-icon matBadge="5" matBadgeColor="warn" aria-hidden="false">notifications</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      <mat-nav-list>
        @for (message of messages; track message) {
          <mat-list-item>
            <mat-icon class="m-x-16" matListItemIcon>info</mat-icon>
            <a matListItemTitle href="#">{{ message }}</a>
          </mat-list-item>
        }
      </mat-nav-list>
    </mat-menu>
  `,
  standalone: true,
  imports: [MatBadgeModule, MatButtonModule, MatIconModule, MatListModule, MatMenuModule],
})
export class NotificationComponent {
  messages = ['Server Error Reports', 'Server Error Reports', 'Server Error Reports'];
}
