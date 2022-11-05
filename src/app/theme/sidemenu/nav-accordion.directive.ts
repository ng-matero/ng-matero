import { Directive } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuService } from '@core';
import { filter } from 'rxjs/operators';
import { NavAccordionItemDirective } from './nav-accordion-item.directive';

@Directive({
  selector: '[navAccordion]',
})
export class NavAccordionDirective {
  protected navLinks: NavAccordionItemDirective[] = [];

  constructor(private router: Router, private menu: MenuService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.checkOpenLinks());

    // Fix opening status for async menu data
    this.menu.change().subscribe(() => {
      setTimeout(() => this.checkOpenLinks());
    });
  }

  addLink(link: NavAccordionItemDirective) {
    this.navLinks.push(link);
  }

  removeLink(link: NavAccordionItemDirective) {
    const index = this.navLinks.indexOf(link);
    if (index !== -1) {
      this.navLinks.splice(index, 1);
    }
  }

  closeOtherLinks(openLink: NavAccordionItemDirective) {
    this.navLinks.forEach(link => {
      if (link !== openLink) {
        link.expanded = false;
      }
    });
  }

  checkOpenLinks() {
    this.navLinks.forEach(link => {
      if (link.route) {
        if (this.router.url.split('/').includes(link.route)) {
          link.expanded = true;
          this.closeOtherLinks(link);
        }
      }
    });
  }
}
