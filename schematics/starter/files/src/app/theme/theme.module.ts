import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SidebarComponent } from './admin-layout/sidebar/sidebar.component';
import { SidemenuComponent } from './admin-layout/sidemenu/sidemenu.component';
import { AccordionAnchorDirective } from './admin-layout/sidemenu/accordionanchor.directive';
import { AccordionDirective } from './admin-layout/sidemenu/accordion.directive';
import { AccordionLinkDirective } from './admin-layout/sidemenu/accordionlink.directive';
import { HeaderComponent } from './admin-layout/header/header.component';
import { NotificationComponent } from './admin-layout/header/notification.component';
import { UserComponent } from './admin-layout/header/user.component';
import { BrandingComponent } from './admin-layout/header/branding.component';
import { UserPanelComponent } from './admin-layout/sidebar/user-panel/user-panel.component';
import { TopmenuComponent } from './admin-layout/topmenu/topmenu.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { SidebarRightComponent } from './admin-layout/sidebar-right/sidebar-right.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    SidebarComponent,
    SidemenuComponent,
    AccordionAnchorDirective,
    AccordionDirective,
    AccordionLinkDirective,
    HeaderComponent,
    NotificationComponent,
    UserComponent,
    BrandingComponent,
    UserPanelComponent,
    TopmenuComponent,
    AuthLayoutComponent,
    SidebarRightComponent,
  ],
  imports: [SharedModule],
})
export class ThemeModule {}
