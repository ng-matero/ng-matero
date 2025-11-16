import {
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MenuService } from '@core';
import { Breadcrumb } from '../breadcrumb/breadcrumb';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
  host: {
    class: 'matero-page-header',
  },
  encapsulation: ViewEncapsulation.None,
  imports: [Breadcrumb, TranslateModule],
})
export class PageHeader {
  private readonly router = inject(Router);
  private readonly menu = inject(MenuService);

  readonly title = input('');
  readonly subtitle = input('');
  readonly nav = input<string[]>([]);
  readonly hideBreadcrumb = input(false, { transform: booleanAttribute });

  titleName = computed(() => {
    const routes = this.router.url.slice(1).split('/');
    const menuLevel = this.menu.getLevel(routes);
    return this.title() || menuLevel[menuLevel.length - 1];
  });
}
