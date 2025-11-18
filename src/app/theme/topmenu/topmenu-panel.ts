import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { Subscription, debounceTime, filter, tap } from 'rxjs';

import { MenuChildrenItem, MenuService } from '@core';

@Component({
  selector: 'app-topmenu-panel',
  templateUrl: './topmenu-panel.html',
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatMenuModule,
    NgxPermissionsModule,
    TranslateModule,
  ],
})
export class TopmenuPanel implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  readonly menu = inject(MenuService);

  readonly menuPanel = viewChild.required(MatMenu);

  readonly items = input<MenuChildrenItem[]>([]);
  readonly parentRoute = input<string[]>([]);
  readonly level = input(1);
  readonly routeChange = output<RouterLinkActive>();

  private routerSubscription = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(e => {
      this.items().map(item => item.active?.set(false));
    });

  ngOnInit() {
    this.items().forEach(item => {
      item.active = signal(this.checkRoute(item));
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  checkRoute(item: MenuChildrenItem) {
    if (!item.route) {
      return this.checkChildRoute(item.children);
    } else {
      return this.router.url.split('/').includes(item.route);
    }
  }

  checkChildRoute(menuItems: MenuChildrenItem[] = []) {
    return menuItems.some(child => {
      if (this.router.url.split('/').includes(child.route)) {
        return true;
      }
      if (!child.route && child.children) {
        this.checkChildRoute(child.children);
      }
      return false;
    });
  }

  onRouterLinkClick(rla: RouterLinkActive) {
    this.routeChange.emit(rla);
  }

  onRouteChange(rla: RouterLinkActive, menuItem: MenuChildrenItem) {
    this.routeChange.emit(rla);

    this.routerSubscription.unsubscribe();
    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        tap(() => {
          const items = this.items();
          items.filter(m => m != menuItem).map(item => item.active?.set(false));
        }),
        debounceTime(10),
        tap(() => {
          menuItem.active?.set(rla.isActive);
        })
      )
      .subscribe();
  }
}
