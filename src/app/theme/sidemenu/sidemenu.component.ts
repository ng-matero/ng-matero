import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MenuService } from '@core';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { NavAccordionToggleDirective } from './nav-accordion-toggle.directive';
import { MatRippleModule } from '@angular/material/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NavAccordionItemDirective } from './nav-accordion-item.directive';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NavAccordionDirective } from './nav-accordion.directive';
import { NgTemplateOutlet, NgFor, NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NavAccordionDirective,
    NgFor,
    NgxPermissionsModule,
    NavAccordionItemDirective,
    RouterLinkActive,
    NgIf,
    MatRippleModule,
    RouterLink,
    NavAccordionToggleDirective,
    MatIconModule,
    AsyncPipe,
    TranslateModule,
  ],
})
export class SidemenuComponent {
  // Note: Ripple effect make page flashing on mobile
  @Input() ripple = false;

  menu$ = this.menu.getAll();

  buildRoute = this.menu.buildRoute;

  constructor(private menu: MenuService) {}
}
