import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    <a mat-button href="javascript:void(0)" [matMenuTriggerFor]="menu">
      <img
        class="matero-user-avatar r-full align-middle"
        src="assets/images/avatar.jpg"
        width="24"
        alt="avatar"
      />
      <span class="align-middle">Zongbin</span>
    </a>

    <mat-menu #menu="matMenu">
      <a routerLink="/profile/overview" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>Profile</span>
      </a>
      <a routerLink="/profile/settings" mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>Settings</span>
      </a>
      <a routerLink="/auth/login" mat-menu-item>
        <mat-icon>exit_to_app</mat-icon>
        <span>Logout</span>
      </a>
    </mat-menu>
  `,
})
export class UserComponent {}
