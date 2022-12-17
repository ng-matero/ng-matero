import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu">
      <mat-icon>notifications</mat-icon>
      <span class="badge bg-red-500">5</span>
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
  styles: [
    `
      .badge {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 12px;
        border-radius: 50rem;
      }
    `,
  ],
})
export class NotificationComponent {
  messages = ['Server Error Reports', 'Server Error Reports', 'Server Error Reports'];
}
