import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
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
    sidebarCollapsed: false,
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  toggleSidenavCollapsed() {
    this.options.sidebarCollapsed = !this.options.sidebarCollapsed;
  }
}
