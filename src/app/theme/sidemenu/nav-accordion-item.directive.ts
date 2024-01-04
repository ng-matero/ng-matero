import { Directive, HostBinding, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { NavAccordionDirective } from './nav-accordion.directive';

@Directive({
  selector: '[navAccordionItem]',
  standalone: true,
})
export class NavAccordionItemDirective implements OnInit, OnDestroy {
  protected nav: NavAccordionDirective;
  protected isExpanded = false;

  @Input() route = '';
  @Input() type: 'link' | 'sub' | 'extLink' | 'extTabLink' = 'link';

  @HostBinding('class.expanded')
  @Input()
  get expanded() {
    return this.isExpanded;
  }
  set expanded(value: boolean) {
    // Only sub menu can be expanded
    this.isExpanded = this.type === 'sub' && value;

    if (value) {
      this.nav.closeOtherLinks(this);
    }
  }

  constructor(@Inject(NavAccordionDirective) nav: NavAccordionDirective) {
    this.nav = nav;
  }

  ngOnInit() {
    this.nav.addLink(this);
  }

  ngOnDestroy() {
    this.nav.removeLink(this);
  }

  toggle() {
    this.expanded = !this.expanded;
  }
}
