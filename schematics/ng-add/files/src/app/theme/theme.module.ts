import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

import { SidebarComponent } from './sidebar/sidebar.component';
import { UserPanelComponent } from './sidebar/user-panel.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { AccordionAnchorDirective } from './sidemenu/accordionanchor.directive';
import { AccordionDirective } from './sidemenu/accordion.directive';
import { AccordionLinkDirective } from './sidemenu/accordionlink.directive';
import { SidebarNoticeComponent } from './sidebar-notice/sidebar-notice.component';

import { TopmenuComponent } from './topmenu/topmenu.component';

import { HeaderComponent } from './header/header.component';
import { BrandingComponent } from './header/branding.component';
import { NotificationComponent } from './header/notification.component';
import { TranslateComponent } from './header/translate.component';
import { UserComponent } from './header/user.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AuthLayoutComponent,
    SidebarComponent,
    UserPanelComponent,
    SidemenuComponent,
    AccordionAnchorDirective,
    AccordionDirective,
    AccordionLinkDirective,
    SidebarNoticeComponent,
    TopmenuComponent,
    HeaderComponent,
    BrandingComponent,
    NotificationComponent,
    TranslateComponent,
    UserComponent,
  ],
  imports: [SharedModule],
})
export class ThemeModule {}
