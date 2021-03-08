import { Component } from '@angular/core';
import { AuthService, User } from '@core/authentication2/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-panel',
  template: `
      <div class="matero-user-panel" fxLayout="column" fxLayoutAlign="center center">
          <img class="matero-user-panel-avatar" [src]="user.avatar" alt="avatar" width="64"/>
          <h4 class="matero-user-panel-name">{{ user.name }}</h4>
          <h5 class="matero-user-panel-email">{{ user.email }}</h5>
          <div class="matero-user-panel-icons">
              <a routerLink="/profile/overview" mat-icon-button>
                  <mat-icon class="icon-20">account_circle</mat-icon>
              </a>
              <a routerLink="/profile/settings" mat-icon-button>
                  <mat-icon class="icon-20">settings</mat-icon>
              </a>
              <a routerLink="/auth/login" mat-icon-button>
                  <mat-icon class="icon-20">exit_to_app</mat-icon>
              </a>
          </div>
      </div>
  `,
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent {
  user: User;

  constructor(auth: AuthService) {
    auth.user().pipe(
      tap(user => console.log(user)),
    ).subscribe(user => this.user = user);
  }
}
