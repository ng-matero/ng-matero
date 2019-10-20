import { Component, OnInit, OnDestroy, ViewChild, HostBinding } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SettingsService, AppSettings } from '@core';

const MOBILE_MEDIAQUERY = 'screen and (max-width: 599px)';
const TABLET_MEDIAQUERY = 'screen and (min-width: 600px) and (max-width: 959px)';
const MONITOR_MEDIAQUERY = 'screen and (min-width: 960px)';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  @ViewChild('content', { static: true }) content: MatSidenavContent;

  options = this.settings.getOptions();

  private mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  get isOver(): boolean {
    return this.mobileQuery.matches;
  }

  private tabletQuery: MediaQueryList;
  private tabletQueryListener: () => void;
  // get isTablet(): boolean {
  //   return this.tabletQuery.matches;
  // }

  private monitorQuery: MediaQueryList;
  private monitorQueryListener: () => void;

  private contentWidthFix = true;
  @HostBinding('class.matero-content-width-fix') get isContentWidthFix() {
    return (
      this.contentWidthFix &&
      this.options.navPos === 'side' &&
      this.options.sidenavOpened &&
      !this.isOver
    );
  }

  private collapsedWidthFix = true;
  @HostBinding('class.matero-sidenav-collapsed-fix') get isCollapsedWidthFix() {
    return (
      this.collapsedWidthFix &&
      (this.options.navPos === 'top' || (this.options.sidenavOpened && this.isOver))
    );
  }

  // Demo purposes only
  @HostBinding('class.theme-dark') get themeDark() {
    return this.options.theme === 'dark';
  }

  constructor(
    private router: Router,
    private media: MediaMatcher,
    private settings: SettingsService,
    private overlay: OverlayContainer
  ) {
    // Set dir attr on body
    document.body.dir = this.options.dir;

    this.mobileQuery = this.media.matchMedia(MOBILE_MEDIAQUERY);
    this.tabletQuery = this.media.matchMedia(TABLET_MEDIAQUERY);
    this.monitorQuery = this.media.matchMedia(MONITOR_MEDIAQUERY);

    this.mobileQueryListener = () => {};
    this.tabletQueryListener = () => {
      this.options.sidenavOpened = true;
      this.options.sidenavCollapsed = this.tabletQuery.matches;
    };
    this.monitorQueryListener = () => {
      this.contentWidthFix = this.monitorQuery.matches;
    };

    /**
     * Safari & IE don't support `addEventListener`
     * this.mobileQuery.addEventListener('change', this.mobileQueryListener);
     */
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this.mobileQueryListener);
    // tslint:disable-next-line: deprecation
    this.tabletQuery.addListener(this.tabletQueryListener);
    // tslint:disable-next-line: deprecation
    this.monitorQuery.addListener(this.monitorQueryListener);

    // TODO: Scroll top to container
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.content.scrollTo({ top: 0 });
      }
    });
  }

  ngOnInit() {
    setTimeout(() => (this.contentWidthFix = this.collapsedWidthFix = false));
  }

  ngOnDestroy() {
    /**
     * Safari & IE don't support `removeEventListener`
     * this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
     */
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this.mobileQueryListener);
    // tslint:disable-next-line: deprecation
    this.tabletQuery.removeListener(this.tabletQueryListener);
    // tslint:disable-next-line: deprecation
    this.monitorQuery.removeListener(this.monitorQueryListener);
  }

  toggleCollapsed() {
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
    this.resetCollapsedState();
  }

  resetCollapsedState(timer = 400) {
    // TODO: Trigger when transition end
    setTimeout(() => {
      this.settings.setNavState('collapsed', this.options.sidenavCollapsed);
    }, timer);
  }

  sidenavCloseStart() {
    this.contentWidthFix = false;
  }

  sidenavOpenedChange(isOpened: boolean) {
    this.options.sidenavOpened = isOpened;
    this.settings.setNavState('opened', isOpened);

    this.collapsedWidthFix = !this.isOver;
    this.resetCollapsedState();
  }

  // Demo purposes only
  receiveOptions(options: AppSettings): void {
    this.options = options;
    this.setTheme(options);
    this.setBodyDir(options);
  }
  setTheme(options: AppSettings) {
    if (options.theme === 'dark') {
      this.overlay.getContainerElement().classList.add('theme-dark');
    } else {
      this.overlay.getContainerElement().classList.remove('theme-dark');
    }
  }
  setBodyDir(options: AppSettings) {
    if (options.dir === 'rtl') {
      document.body.dir = 'rtl';
    } else {
      document.body.dir = 'ltr';
    }
  }
}
