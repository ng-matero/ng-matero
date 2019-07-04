import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '@core';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbComponent implements OnInit {
  routes = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.genBreadcrumb();
  }

  genBreadcrumb() {
    const menu = this.menuService.getAll();
    const url = this.router.url;

    this.routes = url.slice(1).split('/');
    this.routes.unshift('home');
  }
}
