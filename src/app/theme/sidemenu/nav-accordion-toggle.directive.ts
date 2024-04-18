import { Directive, HostListener, inject } from '@angular/core';
import { NavAccordionItemDirective } from './nav-accordion-item.directive';

@Directive({
  selector: '[navAccordionToggle]',
  exportAs: 'navAccordionToggle',
  standalone: true,
})
export class NavAccordionToggleDirective {
  private readonly navItem = inject(NavAccordionItemDirective);

  @HostListener('click', ['$event'])
  onClick() {
    this.navItem.toggle();
  }
}
