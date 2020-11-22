import { Component, ViewEncapsulation } from '@angular/core';
import { MenuService } from '@core';

@Component({
  selector: 'app-topmenu',
  host: {
    class: 'matero-topmenu',
  },
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TopmenuComponent {
  menus = this.menuSrv.getAll();
  buildRoute = this.menuSrv.buildRoute;

  constructor(public menuSrv: MenuService) {}
}
