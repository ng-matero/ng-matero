import { Directive, HostListener, Inject } from '@angular/core';

import { AccordionItemDirective } from './accordionItem.directive';

@Directive({
  selector: '[navAccordionToggle]',
})
export class AccordionAnchorDirective {
  protected navlink: AccordionItemDirective;

  constructor(@Inject(AccordionItemDirective) navlink: AccordionItemDirective) {
    this.navlink = navlink;
  }

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    this.navlink.toggle();
  }
}
