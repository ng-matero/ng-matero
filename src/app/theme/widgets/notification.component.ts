import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-notification',
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu">
      <mat-icon matBadge="5" matBadgeColor="warn" aria-hidden="false">notifications</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      <mat-nav-list>
        <mat-list-item *ngFor="let message of messages">
          <mat-icon class="m-x-16" matListItemIcon>info</mat-icon>
          <a matListItemTitle href="#">{{ message }}</a>
        </mat-list-item>
      </mat-nav-list>
    </mat-menu>
  `,
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, MatBadgeModule, MatListModule, NgFor],
})
export class NotificationComponent {
  messages = ['Server Error Reports', 'Server Error Reports', 'Server Error Reports'];
}
