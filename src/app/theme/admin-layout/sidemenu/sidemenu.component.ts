import {
  Component,
  NgZone,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { MenuService } from '@core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
})
export class SidemenuComponent {
  menus = this.menuService.getAll();
  constructor(private menuService: MenuService) {}
}
