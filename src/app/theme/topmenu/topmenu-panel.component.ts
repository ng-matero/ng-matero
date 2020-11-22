import { Component, ViewChild, Input } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { MenuService } from '@core';

@Component({
  selector: 'app-topmenu-panel',
  templateUrl: './topmenu-panel.component.html',
})
export class TopmenuPanelComponent {
  @ViewChild('menu', { static: true }) menu: MatMenu;
  @Input() items: any[];
  @Input() parentRoute = [];
  @Input() level = 1;

  buildRoute = this.menuSrv.buildRoute;

  constructor(public menuSrv: MenuService) {}
}
