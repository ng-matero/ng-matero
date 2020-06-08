import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '@core/bootstrap/menu.service';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbComponent implements OnInit {
  @Input() nav: string[] = [];

  constructor(private _router: Router, private _menu: MenuService) {}

  ngOnInit() {
    this.nav = Array.isArray(this.nav) ? this.nav : [];

    if (this.nav.length === 0) {
      this.genBreadcrumb();
    }
  }

  trackByNavlink(index: number, navlink: string): string {
    return navlink;
  }

  genBreadcrumb() {
    const states = this._router.url.slice(1).split('/');
    this.nav = this._menu.getMenuLevel(states);
    this.nav.unshift('home');
  }
}
