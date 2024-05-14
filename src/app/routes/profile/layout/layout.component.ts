import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterOutlet } from '@angular/router';

import { AuthService, User } from '@core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    PageHeaderComponent,
  ],
})
export class ProfileLayoutComponent implements OnInit {
  private readonly auth = inject(AuthService);

  user!: User;

  ngOnInit(): void {
    this.auth.user().subscribe(user => (this.user = user));
  }
}
