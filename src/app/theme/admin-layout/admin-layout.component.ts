import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  options = {
    navigationPos: 'side',
    sidebarStyle: 'full',
    sidebarColor: 'white',
    topbarColor: 'white',
    topbarFixed: false,
    dir: 'ltr',
    useBreadcrumb: true,
    breadcrumb: 'simple',
    matTheme: 'egret-navy',
    isMobile: false,
    sidebarCompactToggle: false,
  };

  constructor() {}

  ngOnInit() {}
}
