import { Directive, inject } from '@angular/core';
import { NavAccordionItemDirective } from './nav-accordion-item.directive';

@Directive({
  selector: '[navAccordionToggle]',
  exportAs: 'navAccordionToggle',
  host: {
    '(click)': 'onClick($event)',
  },
})
export class NavAccordionToggleDirective {
  private readonly navItem = inject(NavAccordionItemDirective);

  onClick() {
    this.navItem.toggle();
  }
}
