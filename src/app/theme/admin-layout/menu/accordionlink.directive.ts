import {
  Directive,
  HostBinding,
  Inject,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { AccordionDirective } from './accordion.directive';

@Directive({
  selector: '[appAccordionLink]',
})
export class AccordionLinkDirective implements OnInit, OnDestroy {
  @Input() public group: any;

  @HostBinding('class.open')
  @Input()
  get open(): boolean {
    return this.OPEN;
  }

  set open(value: boolean) {
    this.OPEN = value;
    if (value) {
      this.nav.closeOtherLinks(this);
    }
  }

  protected OPEN: boolean;
  protected nav: AccordionDirective;

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
