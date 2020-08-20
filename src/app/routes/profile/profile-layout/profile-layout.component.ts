import { Component } from '@angular/core';
import { SettingsService, User } from '@core';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
})
export class ProfileLayoutComponent {
  user: User;

  constructor(settings: SettingsService) {
    this.user = settings.user;
  }
}
