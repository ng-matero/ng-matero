import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@core/authentication';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    PageHeaderComponent,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    RouterLink,
    MatIconModule,
    RouterOutlet,
  ],
})
export class ProfileLayoutComponent implements OnInit {
  user!: User;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user().subscribe(user => (this.user = user));
  }
}
