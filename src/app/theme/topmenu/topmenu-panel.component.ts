import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { NavigationEnd, Router, RouterLinkActive } from '@angular/router';
import { MenuChildrenItem, MenuService } from '@core';
import { filter } from 'rxjs/operators';
import { TopmenuState } from './topmenu.component';

@Component({
  selector: 'app-topmenu-panel',
  templateUrl: './topmenu-panel.component.html',
})
export class TopmenuPanelComponent implements OnInit {
  @ViewChild('menu', { static: true }) menu: MatMenu;

  @Input() items: MenuChildrenItem[] = [];
  @Input() parentRoute = [];
  @Input() level = 1;
  @Output() routeChange = new EventEmitter<any>();

  menuStates: TopmenuState[] = [];

  buildRoute = this.menuSrv.buildRoute;

  constructor(public menuSrv: MenuService, private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(e => {
      this.menuStates.forEach(item => (item.active = false));
    });
  }

  ngOnInit() {
    this.items.forEach(item => {
      this.menuStates.push({ active: this.checkRoute(item), route: item.route });
    });
  }

  checkRoute(item: MenuChildrenItem) {
    if (!item.route) {
      return this.checkChildRoute(item.children);
    } else {
      return this.router.url.split('/').includes(item.route);
    }
  }

  checkChildRoute(menuItems: MenuChildrenItem[]) {
    return menuItems.some(child => {
      if (this.router.url.split('/').includes(child.route)) {
        return true;
      }
      if (!child.route && child.children) {
        this.checkChildRoute(child.children);
      }
    });
  }

  onRouterLinkClick(rla: RouterLinkActive) {
    this.routeChange.emit(rla);
  }

  onRouteChange(rla: RouterLinkActive, index: number) {
    this.routeChange.emit(rla);

    setTimeout(() => {
      this.menuStates[index].active = rla.isActive;
    }, 100);
  }
}
