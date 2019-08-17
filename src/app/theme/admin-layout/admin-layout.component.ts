import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { SettingsService } from '@core';

const MAX_WIDTH = '960px';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  @ViewChild('content', { static: true }) content: MatSidenavContent;

  sidenavCollapsed = false;
  options = this.settings.getOptions();
  mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;

  get isOver(): boolean {
    return this.mobileQuery.matches;
  }

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private media: MediaMatcher,
    private settings: SettingsService
  ) {
    this.mobileQuery = this.media.matchMedia(`(max-width: ${MAX_WIDTH})`);
    this.mobileQueryListener = () => this.cdr.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);

    // TODO: Scroll top to container
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.content.scrollTo({ top: 0 });
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  toggleCollapsed() {
    this.sidenavCollapsed = !this.sidenavCollapsed;

    // TODO: Trigger when animation end
    setTimeout(() => {
      this.settings.setNavState('collapsed', this.sidenavCollapsed);
    }, 400);
  }

  receiveOptions(options: any): void {
    this.options = options;
  }

  openedChange(e: boolean) {
    this.settings.setNavState('opened', e);
  }
}
