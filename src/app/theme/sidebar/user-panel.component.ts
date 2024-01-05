import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { AuthService, User } from '@core/authentication';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-panel',
  template: `
    <div class="matero-user-panel">
      <img class="matero-user-panel-avatar" [src]="user.avatar" alt="avatar" width="64" />
      <h4 class="matero-user-panel-name">{{ user.name }}</h4>
      <h5 class="matero-user-panel-email">{{ user.email }}</h5>
      <div class="matero-user-panel-icons">
        <button
          mat-icon-button
          routerLink="/profile/overview"
          matTooltip="{{ 'profile' | translate }}"
        >
          <mat-icon>account_circle</mat-icon>
        </button>
        <button
          mat-icon-button
          routerLink="/profile/settings"
          matTooltip="{{ 'edit_profile' | translate }}"
        >
          <mat-icon>edit</mat-icon>
        </button>
        <button mat-icon-button (click)="logout()" matTooltip="{{ 'logout' | translate }}">
          <mat-icon>exit_to_app</mat-icon>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./user-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatTooltipModule, TranslateModule],
})
export class UserPanelComponent implements OnInit {
  user!: User;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.user().subscribe(user => (this.user = user));
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigateByUrl('/auth/login');
    });
  }
}
