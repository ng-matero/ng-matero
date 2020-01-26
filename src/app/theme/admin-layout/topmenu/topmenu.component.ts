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

  // Delete empty values and rebuild state
  buildState(states: string[]) {
    let state = '';
    states.forEach(item => {
      if (item && item.trim()) {
        state += '/' + item.replace(/^\/+|\/+$/g, '');
      }
    });
    return state;
  }
}
