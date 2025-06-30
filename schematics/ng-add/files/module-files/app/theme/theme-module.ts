import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared-module';

import { AdminLayout } from './admin-layout/admin-layout';
import { AuthLayout } from './auth-layout/auth-layout';

import { Sidebar } from './sidebar/sidebar';
import { UserPanel } from './sidebar/user-panel';
import { Sidemenu } from './sidemenu/sidemenu';
import { NavAccordion } from './sidemenu/nav-accordion';
import { NavAccordionItem } from './sidemenu/nav-accordion-item';
import { NavAccordionToggle } from './sidemenu/nav-accordion-toggle';
import { SidebarNotice } from './sidebar-notice/sidebar-notice';

import { Topmenu } from './topmenu/topmenu';
import { TopmenuPanel } from './topmenu/topmenu-panel';

import { Header } from './header/header';

import { Branding } from './widgets/branding';
import { NotificationButton } from './widgets/notification-button';
import { TranslateButton } from './widgets/translate-button';
import { UserButton } from './widgets/user-button';

@NgModule({
  imports: [
    SharedModule,
    AdminLayout,
    AuthLayout,
    Sidebar,
    UserPanel,
    Sidemenu,
    NavAccordion,
    NavAccordionItem,
    NavAccordionToggle,
    SidebarNotice,
    Topmenu,
    TopmenuPanel,
    Header,
    Branding,
    NotificationButton,
    TranslateButton,
    UserButton,
  ],
})
export class ThemeModule {}
