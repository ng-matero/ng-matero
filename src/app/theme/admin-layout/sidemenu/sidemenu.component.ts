import { Component, Input } from '@angular/core';
import { MenuService } from '@core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
})
export class SidemenuComponent {
  // NOTE: Ripple effect make page flashing on mobile
  @Input() ripple = false;

  menus = this.menuService.getAll();

  constructor(private menuService: MenuService) {}

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
