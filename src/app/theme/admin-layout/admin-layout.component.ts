import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;

  mobileQuery: MediaQueryList;
  options = {
    navigationPos: 'side',
    sidenavStyle: 'full',
    sidenavColor: 'white',
    topbarColor: 'white',
    topbarFixed: false,
    useBreadcrumb: true,
    sidenavCollapsed: false,
    dir: 'ltr',
  };

  private mobileQueryListener: () => void;

  get isOver(): boolean {
    return this.mobileQuery.matches;
  }

  constructor(private cdr: ChangeDetectorRef, private media: MediaMatcher) {
    this.mobileQuery = this.media.matchMedia('(max-width: 960px)');
    this.mobileQueryListener = () => this.cdr.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {}

  ngOnDestroy() {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  toggleCollapsed() {
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
