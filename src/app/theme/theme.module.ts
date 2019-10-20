import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SidebarComponent } from './admin-layout/sidebar/sidebar.component';
import { UserPanelComponent } from './admin-layout/sidebar/user-panel.component';
import { SidemenuComponent } from './admin-layout/sidemenu/sidemenu.component';
import { AccordionAnchorDirective } from './admin-layout/sidemenu/accordionanchor.directive';
import { AccordionDirective } from './admin-layout/sidemenu/accordion.directive';
import { AccordionLinkDirective } from './admin-layout/sidemenu/accordionlink.directive';
import { SidebarNoticeComponent } from './admin-layout/sidebar-notice/sidebar-notice.component';
import { HeaderComponent } from './admin-layout/header/header.component';
import { BrandingComponent } from './admin-layout/header/branding.component';
import { NotificationComponent } from './admin-layout/header/notification.component';
import { UserComponent } from './admin-layout/header/user.component';
import { TopmenuComponent } from './admin-layout/topmenu/topmenu.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { CustomizerComponent } from './admin-layout/customizer/customizer.component';
import { GithubButtonComponent } from './admin-layout/header/github.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    SidebarComponent,
    UserPanelComponent,
    SidemenuComponent,
    AccordionAnchorDirective,
    AccordionDirective,
    AccordionLinkDirective,
    SidebarNoticeComponent,
    HeaderComponent,
    BrandingComponent,
    NotificationComponent,
    UserComponent,
    TopmenuComponent,
    AuthLayoutComponent,
    CustomizerComponent,
    GithubButtonComponent,
  ],
  imports: [SharedModule],
})
export class ThemeModule {}
