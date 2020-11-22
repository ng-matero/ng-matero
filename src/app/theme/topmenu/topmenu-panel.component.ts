import { Component, ViewChild, Input } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { MenuChildrenItem, MenuService } from '@core';

@Component({
  selector: 'app-topmenu-panel',
  templateUrl: './topmenu-panel.component.html',
})
export class TopmenuPanelComponent {
  @ViewChild('menu', { static: true }) menu: MatMenu;
  @Input() items: MenuChildrenItem[];
  @Input() parentRoute = [];
  @Input() level = 1;

  buildRoute = this.menuSrv.buildRoute;

  constructor(public menuSrv: MenuService) {}
}
