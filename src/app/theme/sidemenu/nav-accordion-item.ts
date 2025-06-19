import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { NavAccordion } from './nav-accordion';

@Directive({
  selector: '[navAccordionItem]',
  exportAs: 'navAccordionItem',
  host: {
    '[class.expanded]': 'expanded',
  },
})
export class NavAccordionItem implements OnInit, OnDestroy {
  private readonly nav = inject(NavAccordion);
  private readonly cdr = inject(ChangeDetectorRef);

  @Input() route = '';
  @Input() type: 'link' | 'sub' | 'extLink' | 'extTabLink' = 'link';

  @Input()
  get expanded() {
    return this.isExpanded;
  }
  set expanded(value: boolean) {
    this.isExpanded = value;
    this.cdr.markForCheck();

    if (value) {
      this.nav.closeOtherItems(this);
    }
  }
  private isExpanded = false;

  ngOnInit() {
    this.nav.addItem(this);
  }

  ngOnDestroy() {
    this.nav.removeItem(this);
  }

  toggle() {
    this.expanded = !this.expanded;
  }
}
