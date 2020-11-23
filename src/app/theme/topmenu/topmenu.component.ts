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
  menu$ = this.menuSrv.getAll();
  buildRoute = this.menuSrv.buildRoute;

  menuSubscription: Subscription;

  menuList: Menu[] = [];
  menuStates: TopmenuState[] = [];

  constructor(public menuSrv: MenuService, private router: Router) {
    this.menuSubscription = this.menu$.subscribe(res => {
      this.menuList = res;
      this.menuList.forEach(item => {
        this.menuStates.push({
          active: this.router.url.split('/').includes(item.route),
          route: item.route,
        });
      });
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(e => {
      this.menuStates.forEach(item => (item.active = false));
    });
  }

  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
  }

  onRouteChange(rla: RouterLinkActive, index: number) {
    setTimeout(() => {
      this.menuStates[index].active = rla.isActive;
    }, 100);
  }
}
