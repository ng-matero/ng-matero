import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, HostBinding, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Menu, MenuService } from '@core';
import { TopmenuPanelComponent } from './topmenu-panel.component';

export interface TopmenuState {
  active: boolean;
  route: string;
}

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
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
    TopmenuPanelComponent,
  ],
})
export class TopmenuComponent implements OnDestroy {
  @HostBinding('class') class = 'matero-topmenu';

  menu$ = this.menu.getAll();

  buildRoute = this.menu.buildRoute;

  menuList: Menu[] = [];
  menuStates: TopmenuState[] = [];

  private menuSubscription = Subscription.EMPTY;
  private routerSubscription = Subscription.EMPTY;

  constructor(
    private menu: MenuService,
    private router: Router
  ) {
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
    this.routerSubscription.unsubscribe();
  }

  onRouteChange(rla: RouterLinkActive, index: number) {
    this.routerSubscription.unsubscribe();
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(e => {
        this.menuStates.forEach(item => (item.active = false));
        setTimeout(() => (this.menuStates[index].active = rla.isActive));
      });
  }
}
