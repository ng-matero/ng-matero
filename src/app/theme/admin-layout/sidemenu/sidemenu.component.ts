import { Component } from '@angular/core';
import { MenuService } from '@core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
})
export class SidemenuComponent {
  menus = this.menuService.getAll();

  constructor(private menuService: MenuService) {}

  // 删除数组内的空值
  filterStates(states: string[]) {
    return states.filter(item => item && item.trim());
  }
}
