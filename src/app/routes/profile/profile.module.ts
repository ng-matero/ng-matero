import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileLayoutComponent } from './layout/layout.component';
import { ProfileOverviewComponent } from './overview/overview.component';
import { ProfileSettingsComponent } from './settings/settings.component';

const COMPONENTS: any[] = [
  ProfileLayoutComponent,
  ProfileOverviewComponent,
  ProfileSettingsComponent,
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, ProfileRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class ProfileModule {}
