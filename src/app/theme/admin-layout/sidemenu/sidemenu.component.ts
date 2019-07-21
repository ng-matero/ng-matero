import { Component } from '@angular/core';
import { MenuService } from '@core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
})
export class SidemenuComponent {
  menus = this.menuService.getAll();

  constructor(private menuService: MenuService) {}

  // Delete empty value in array
  filterStates(states: string[]) {
    return states.filter(item => item && item.trim());
  }
}
