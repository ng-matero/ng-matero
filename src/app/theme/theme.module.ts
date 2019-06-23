import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SidebarComponent } from './admin-layout/sidebar/sidebar.component';
import { MenuComponent } from './admin-layout/menu/menu.component';
import { AccordionAnchorDirective } from './admin-layout/menu/accordionanchor.directive';
import { AccordionDirective } from './admin-layout/menu/accordion.directive';
import { AccordionLinkDirective } from './admin-layout/menu/accordionlink.directive';
import { NotificationComponent } from './admin-layout/notification/notification.component';
import { HeaderComponent } from './admin-layout/header/header.component';
import { CustomizerComponent } from './admin-layout/customizer/customizer.component';
import { BreadcrumbComponent } from './admin-layout/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    SidebarComponent,
    MenuComponent,
    AccordionAnchorDirective,
    AccordionDirective,
    AccordionLinkDirective,
    NotificationComponent,
    HeaderComponent,
    CustomizerComponent,
    BreadcrumbComponent,
  ],
  imports: [SharedModule],
})
export class ThemeModule {}
