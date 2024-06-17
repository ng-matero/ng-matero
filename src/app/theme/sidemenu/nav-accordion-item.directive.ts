import {
  ChangeDetectorRef,
  Directive,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { NavAccordionDirective } from './nav-accordion.directive';

@Directive({
  selector: '[navAccordionItem]',
  exportAs: 'navAccordionItem',
  standalone: true,
})
export class NavAccordionItemDirective implements OnInit, OnDestroy {
  private readonly nav = inject(NavAccordionDirective);
  private readonly cdr = inject(ChangeDetectorRef);

  @Input() route = '';
  @Input() type: 'link' | 'sub' | 'extLink' | 'extTabLink' = 'link';

  @HostBinding('class.expanded')
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
