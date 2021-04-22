import { Component, OnInit } from '@angular/core';
import { User } from '@core/authentication/interface';
import { AuthService } from '@core/authentication/auth.service';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './layout.component.html',
})
export class ProfileLayoutComponent implements OnInit {
  user: User;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user().subscribe(user => (this.user = user));
  }
}
