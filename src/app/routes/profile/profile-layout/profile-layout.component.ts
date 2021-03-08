import { Component, OnInit } from '@angular/core';
import { SettingsService, User } from '@core';
import { AuthService } from '@core/authentication2/auth.service';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
})
export class ProfileLayoutComponent implements OnInit {
  user: User;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user().subscribe(user => this.user = user);
  }
}
