import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  HostBinding,
} from '@angular/core';
import { MenuService } from '@core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageHeaderComponent implements OnInit {
  @HostBinding('class.matero-page-header') show = true;

  @Input() title = '';
  @Input() subtitle = '';
  @Input() showBreadCrumb = true;

  constructor(private router: Router, private menuService: MenuService) {
    const states = this.router.url.slice(1).split('/');
    this.title = this.menuService.getMenuItemName(states);
  }

  ngOnInit() {}
}
