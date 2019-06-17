import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  // tslint:disable-next-line: variable-name
  private _mobileQueryListener: () => void;

  get isOver(): boolean {
    return this.mobileQuery.matches;
  }

  constructor(private cdr: ChangeDetectorRef, private media: MediaMatcher) {
    this.mobileQuery = this.media.matchMedia('(max-width: 960px)');
    this._mobileQueryListener = () => this.cdr.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {}

  ngOnDestroy() {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleCollapsed() {
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
    this.cdr.detectChanges();
  }

  toggleSidenav() {
    this.sidenav.toggle();
    this.cdr.detectChanges();
  }
}
