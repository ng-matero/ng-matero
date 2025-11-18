import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { AuthService } from '@core';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeader } from '@shared';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  imports: [
    RouterLink,
    RouterOutlet,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    PageHeader,
    TranslateModule,
  ],
})
export class ProfileLayout {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  user = toSignal(this.auth.user());

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigateByUrl('/auth/login');
    });
  }
}
