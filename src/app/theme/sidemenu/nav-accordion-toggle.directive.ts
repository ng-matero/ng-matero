import { Directive, HostListener, Inject } from '@angular/core';
import { NavAccordionItemDirective } from './nav-accordion-item.directive';

@Directive({
  selector: '[navAccordionToggle]',
  standalone: true,
})
export class NavAccordionToggleDirective {
  protected navLink: NavAccordionItemDirective;

  constructor(@Inject(NavAccordionItemDirective) navLink: NavAccordionItemDirective) {
    this.navLink = navLink;
  }

  @HostListener('click', ['$event'])
  onClick() {
    this.navLink.toggle();
  }
}
