import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, RouterLinkActive } from '@angular/router';
import { Menu, MenuService } from '@core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface TopmenuState {
  active: boolean;
  route: string;
}

@Component({
  selector: 'app-topmenu',
  host: {
    class: 'matero-topmenu',
  },
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TopmenuComponent implements OnDestroy {
  menu$ = this.menu.getAll();
  buildRoute = this.menu.buildRoute;

  menuList: Menu[] = [];
  menuStates: TopmenuState[] = [];

  private menuSubscription: Subscription;
  private routerSubscription!: Subscription;

  constructor(private menu: MenuService, private router: Router) {
    this.menuSubscription = this.menu$.subscribe(res => {
      this.menuList = res;
      this.menuList.forEach(item => {
        this.menuStates.push({
          active: this.router.url.split('/').includes(item.route),
          route: item.route,
        });
      });
    });
  }

  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
    this.routerSubscription?.unsubscribe();
  }

  onRouteChange(rla: RouterLinkActive, index: number) {
    this.routerSubscription?.unsubscribe();
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(e => {
        this.menuStates.forEach(item => (item.active = false));
        setTimeout(() => (this.menuStates[index].active = rla.isActive));
      });
  }
}
