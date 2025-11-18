import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, OnDestroy, ViewEncapsulation, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { debounceTime, filter, tap } from 'rxjs';

import { Menu, MenuService } from '@core';
import { TopmenuPanel } from './topmenu-panel';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.html',
  styleUrl: './topmenu.scss',
  host: {
    class: 'matero-topmenu',
  },
  encapsulation: ViewEncapsulation.None,
  imports: [
    AsyncPipe,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    NgxPermissionsModule,
    TranslateModule,
    TopmenuPanel,
  ],
})
export class Topmenu implements OnDestroy {
  private readonly router = inject(Router);
  readonly menu = inject(MenuService);

  menuList: Menu[] = [];

  private menuSubscription = this.menu.getAll().subscribe(items => {
    this.menuList = items.map(item => {
      const isCurrentRoute = this.router.url.split('/').includes(item.route);
      item.active = signal(isCurrentRoute);
      return item;
    });
  });

  private routerSubscription = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(e => {
      this.menuList.map(item => item.active?.set(false));
    });

  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  onRouteChange(rla: RouterLinkActive, menuItem: Menu) {
    this.routerSubscription.unsubscribe();
    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        tap(() => {
          this.menuList.filter(m => m != menuItem).map(item => item.active?.set(false));
        }),
        debounceTime(10),
        tap(() => {
          menuItem.active?.set(rla.isActive);
        })
      )
      .subscribe();
  }
}
