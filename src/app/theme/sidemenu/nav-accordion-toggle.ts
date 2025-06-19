import { Directive, inject } from '@angular/core';
import { NavAccordionItem } from './nav-accordion-item';

@Directive({
  selector: '[navAccordionToggle]',
  exportAs: 'navAccordionToggle',
  host: {
    '(click)': 'onClick($event)',
  },
})
export class NavAccordionToggle {
  private readonly navItem = inject(NavAccordionItem);

  onClick() {
    this.navItem.toggle();
  }
}
