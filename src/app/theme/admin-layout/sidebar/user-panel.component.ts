import { Component } from '@angular/core';

@Component({
  selector: 'app-user-panel',
  template: `
    <div
      class="matero-user-panel p-y-16 b-t-1 b-b-1"
      fxLayout="column"
      fxLayoutAlign="center center"
    >
      <img
        class="matero-user-panel-avatar m-b-8 r-full"
        src="assets/images/avatar.jpg"
        alt="avatar"
        width="64"
      />
      <h4 class="matero-user-panel-name m-t-0 m-b-8 f-w-400">Zongbin</h4>
      <h5 class="matero-user-panel-email m-t-0 m-b-8 f-w-400">nzb329@163.com</h5>
      <div class="matero-user-panel-icons text-nowrap">
        <a routerLink="/profile/overview" mat-icon-button>
          <mat-icon class="icon-18">account_circle</mat-icon>
        </a>
        <a routerLink="/profile/settings" mat-icon-button>
          <mat-icon class="icon-18">settings</mat-icon>
        </a>
        <a routerLink="/auth/login" mat-icon-button>
          <mat-icon class="icon-18">exit_to_app</mat-icon>
        </a>
      </div>
    </div>
  `,
})
export class UserPanelComponent {}
