import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, tap } from 'rxjs/operators';
import { AuthService, User } from '@core/authentication';

@Component({
  selector: 'app-user',
  template: `
    <button class="matero-avatar-button" mat-button [matMenuTriggerFor]="menu">
      <img matButtonIcon class="matero-avatar" [src]="user.avatar" width="24" alt="avatar" />
      <span class="matero-username">{{ user.name }}</span>
    </button>

    <mat-menu #menu="matMenu">
      <button routerLink="/profile/overview" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>{{ 'user.profile' | translate }}</span>
      </button>
      <button routerLink="/profile/settings" mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>{{ 'user.settings' | translate }}</span>
      </button>
      <button mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>{{ 'user.logout' | translate }}</span>
      </button>
    </mat-menu>
  `,
  styles: [
    `
      .matero-avatar-button.mat-mdc-button {
        border-radius: 50rem;

        .matero-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50rem;
        }

        .matero-username {
          margin: 0 8px;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit {
  user!: User;

  constructor(private router: Router, private auth: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.auth
      .user()
      .pipe(
        tap(user => (this.user = user)),
        debounceTime(10)
      )
      .subscribe(() => this.cdr.detectChanges());
  }

  logout() {
    this.auth.logout().subscribe(() => this.router.navigateByUrl('/auth/login'));
  }
}
