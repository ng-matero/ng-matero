import { AfterContentChecked, Directive } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AccordionLinkDirective } from './accordionlink.directive';

@Directive({
  selector: '[navAccordion]',
})
export class AccordionDirective implements AfterContentChecked {
  protected navlinks: Array<AccordionLinkDirective> = [];

  constructor(private router: Router) {
    // Fix: `ERROR Error: ExpressionChangedAfterItHasBeenCheckedError:
    // Expression has changed after it was checked`.
    setTimeout(() => this.checkOpenLinks());
  }

  ngAfterContentChecked(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(e => this.checkOpenLinks());
  }

  addLink(link: AccordionLinkDirective): void {
    this.navlinks.push(link);
  }

  closeOtherLinks(openLink: AccordionLinkDirective): void {
    this.navlinks.forEach((link: AccordionLinkDirective) => {
      if (link !== openLink) {
        link.open = false;
      }
    });
  }

  removeGroup(link: AccordionLinkDirective): void {
    const index = this.navlinks.indexOf(link);
    if (index !== -1) {
      this.navlinks.splice(index, 1);
    }
  }

  checkOpenLinks() {
    this.navlinks.forEach((link: AccordionLinkDirective) => {
      if (link.group) {
        const routeUrl = this.router.url;
        const currentUrl = routeUrl.split('/');
        if (currentUrl.indexOf(link.group) > 0) {
          link.open = true;
          this.closeOtherLinks(link);
        }
      }
    });
  }
}
