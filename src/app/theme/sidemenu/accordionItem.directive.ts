import { Directive, HostBinding, Inject, Input, OnInit, OnDestroy } from '@angular/core';

import { AccordionDirective } from './accordion.directive';

@Directive({
  selector: '[navAccordionItem]',
})
export class AccordionItemDirective implements OnInit, OnDestroy {
  protected OPEN = false;
  protected nav: AccordionDirective;

  @Input() group: any;
  @Input() type!: 'link' | 'sub' | 'extLink' | 'extTabLink';

  @HostBinding('class.open')
  @Input()
  get open(): boolean {
    return this.OPEN;
  }
  set open(value: boolean) {
    // Only sub menu can be open
    this.OPEN = this.type === 'sub' && value;
    if (value) {
      this.nav.closeOtherLinks(this);
    }
  }

  constructor(@Inject(AccordionDirective) nav: AccordionDirective) {
    this.nav = nav;
  }

  ngOnInit(): any {
    this.nav.addLink(this);
  }

  ngOnDestroy(): any {
    this.nav.removeGroup(this);
  }

  toggle(): any {
    this.open = !this.open;
  }
}
