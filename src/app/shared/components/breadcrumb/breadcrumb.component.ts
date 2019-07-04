import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuService } from '@core';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
