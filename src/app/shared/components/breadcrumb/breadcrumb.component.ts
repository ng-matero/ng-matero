import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MenuService } from '@core/bootstrap/menu.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatIconModule, TranslateModule],
})
export class BreadcrumbComponent implements OnInit {
  @Input() nav: string[] = [];

  constructor(
    private router: Router,
    private menu: MenuService
  ) {}

  ngOnInit() {
    this.nav = Array.isArray(this.nav) ? this.nav : [];

    if (this.nav.length === 0) {
      this.genBreadcrumb();
    }
  }

  trackByNavlink(index: number, navLink: string): string {
    return navLink;
  }

  genBreadcrumb() {
    const routes = this.router.url.slice(1).split('/');
    this.nav = this.menu.getLevel(routes);
    this.nav.unshift('home');
  }
}
