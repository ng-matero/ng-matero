import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  imports: [MatCardModule, MatTabsModule],
})
export class ProfileOverviewComponent {}
