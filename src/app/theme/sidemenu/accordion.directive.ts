import { Directive } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuService } from '@core';
import { filter } from 'rxjs/operators';
import { AccordionItemDirective } from './accordionItem.directive';

@Directive({
  selector: '[navAccordion]',
})
export class AccordionDirective {
  protected navlinks: Array<AccordionItemDirective> = [];

  constructor(private router: Router, private menu: MenuService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.checkOpenLinks());

    // Fix opening status for async menu data
    this.menu.change().subscribe(() => {
      setTimeout(() => this.checkOpenLinks());
    });
  }

  addLink(link: AccordionItemDirective): void {
    this.navlinks.push(link);
  }

  closeOtherLinks(openLink: AccordionItemDirective): void {
    this.navlinks.forEach((link: AccordionItemDirective) => {
      if (link !== openLink) {
        link.open = false;
      }
    });
  }

  removeGroup(link: AccordionItemDirective): void {
    const index = this.navlinks.indexOf(link);
    if (index !== -1) {
      this.navlinks.splice(index, 1);
    }
  }

  checkOpenLinks() {
    this.navlinks.forEach((link: AccordionItemDirective) => {
      if (link.group) {
        if (this.router.url.split('/').includes(link.group)) {
          link.open = true;
          this.closeOtherLinks(link);
        }
      }
    });
  }
}
