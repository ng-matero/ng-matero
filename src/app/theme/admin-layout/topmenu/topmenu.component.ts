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

  // 删除数组内的空值
  filterStates(states: string[]) {
    return states.filter(item => item && item.trim());
  }
}
