import {
  Component,
  OnDestroy,
  ViewChild,
  HostBinding,
  Inject,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { Directionality } from '@angular/cdk/bidi';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';

import { SettingsService, AppSettings } from '@core';
import { AppDirectionality } from '@shared';

const MOBILE_MEDIAQUERY = 'screen and (max-width: 599px)';
const TABLET_MEDIAQUERY = 'screen and (min-width: 600px) and (max-width: 959px)';
const MONITOR_MEDIAQUERY = 'screen and (min-width: 960px)';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminLayoutComponent implements OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  @ViewChild('content', { static: true }) content!: MatSidenavContent;

  options = this.settings.getOptions();

  private layoutChangesSubscription = Subscription.EMPTY;

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  private isMobileScreen = false;

  @HostBinding('class.matero-content-width-fix') get contentWidthFix() {
    return (
      this.isContentWidthFixed &&
      this.options.navPos === 'side' &&
      this.options.sidenavOpened &&
      !this.isOver
    );
  }

  private isContentWidthFixed = true;

  @HostBinding('class.matero-sidenav-collapsed-fix') get collapsedWidthFix() {
    return (
      this.isCollapsedWidthFixed &&
      (this.options.navPos === 'top' || (this.options.sidenavOpened && this.isOver))
    );
  }

  private isCollapsedWidthFixed = false;

  private htmlElement!: HTMLHtmlElement;

  constructor(
    private router: Router,
    private mediaMatcher: MediaMatcher,
    private breakpointObserver: BreakpointObserver,
    private settings: SettingsService,
    @Optional() @Inject(DOCUMENT) private document: Document,
    @Inject(Directionality) public dir: AppDirectionality
  ) {
    this.dir.value = this.options.dir;
    this.document.body.dir = this.dir.value;

    this.htmlElement = this.document.querySelector('html')!;

    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_MEDIAQUERY, TABLET_MEDIAQUERY, MONITOR_MEDIAQUERY])
      .subscribe(state => {
        // SidenavOpened must be reset true when layout changes
        this.options.sidenavOpened = true;

        this.isMobileScreen = state.breakpoints[MOBILE_MEDIAQUERY];
        this.options.sidenavCollapsed = state.breakpoints[TABLET_MEDIAQUERY];
        this.isContentWidthFixed = state.breakpoints[MONITOR_MEDIAQUERY];
      });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(e => {
      if (this.isOver) {
        this.sidenav.close();
      }
      this.content.scrollTo({ top: 0 });
    });

    if (this.options.theme === 'auto') {
      this.setAutoTheme();
    }

    // Initialize project theme with options
    this.receiveOptions(this.options);
  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleCollapsed() {
    this.isContentWidthFixed = false;
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
    this.resetCollapsedState();
  }

  // TODO: Trigger when transition end
  resetCollapsedState(timer = 400) {
    setTimeout(() => this.settings.setOptions(this.options), timer);
  }

  onSidenavClosedStart() {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
    this.options.sidenavOpened = isOpened;
    this.settings.setOptions(this.options);
  }

  setAutoTheme() {
    // Check whether the browser support `prefers-color-scheme`
    if (this.mediaMatcher.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      const isSystemDark = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches;
      // Set theme to dark if `prefers-color-scheme` is dark. Otherwise, set it to light.
      this.options.theme = isSystemDark ? 'dark' : 'light';
    } else {
      // If the browser does not support `prefers-color-scheme`, set the default to light.
      this.options.theme = 'light';
    }
  }

  // Demo purposes only

  receiveOptions(options: AppSettings): void {
    this.options = options;
    this.settings.setOptions(options);
    this.toggleDarkTheme(options);
    this.toggleDirection(options);
  }

  toggleDarkTheme(options: AppSettings) {
    if (options.theme === 'dark') {
      this.htmlElement.classList.add('theme-dark');
    } else {
      this.htmlElement.classList.remove('theme-dark');
    }
  }

  toggleDirection(options: AppSettings) {
    this.dir.value = options.dir;
    this.document.body.dir = this.dir.value;
  }
}
