import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { OverviewComponent } from './overview/overview.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [ProfileLayoutComponent, OverviewComponent, SettingsComponent],
  imports: [CommonModule, SharedModule, ProfileRoutingModule],
})
export class ProfileModule {}
