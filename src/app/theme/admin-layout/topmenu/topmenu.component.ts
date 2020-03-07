import { Component, OnInit } from '@angular/core';
import { MenuService } from '@core';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
})
export class TopmenuComponent implements OnInit {
  menus = this.menuService.getAll();

  constructor(public menuService: MenuService) {}

  ngOnInit() {}

  // Delete empty values and rebuild route
  buildRoute(states: string[]) {
    let route = '';
    states.forEach(item => {
      if (item && item.trim()) {
        route += '/' + item.replace(/^\/+|\/+$/g, '');
      }
    });
    return route;
  }
}
