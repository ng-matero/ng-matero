import { Directive, OnDestroy, OnInit, inject, input, signal } from '@angular/core';
import { NavAccordion } from './nav-accordion';

@Directive({
  selector: '[navAccordionItem]',
  exportAs: 'navAccordionItem',
  host: {
    '[class.expanded]': 'expanded()',
  },
})
export class NavAccordionItem implements OnInit, OnDestroy {
  private readonly nav = inject(NavAccordion);

  readonly route = input('');

  expanded = signal(false);

  ngOnInit() {
    this.nav.addItem(this);
  }

  ngOnDestroy() {
    this.nav.removeItem(this);
  }

  toggle() {
    this.expanded.update(v => !v);

    if (this.expanded()) {
      this.nav.closeOtherItems(this);
    }
  }

  setExpanded(value: boolean): void {
    if (this.expanded() !== value) {
      this.expanded.set(value);
    }
  }
}
