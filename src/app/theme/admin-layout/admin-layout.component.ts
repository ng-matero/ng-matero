import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  HostBinding,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SettingsService, AppSettings } from '@core';

const WIDTH_BREAKPOINT = '960px';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  @ViewChild('content', { static: true }) content: MatSidenavContent;

  options = this.settings.getOptions();
  sidenavCollapsed = false;

  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  get isOver(): boolean {
    return this.mobileQuery.matches;
  }

  contentWidthFix = true;
  @HostBinding('class.matero-content-width-fix') get widthFix() {
    return this.contentWidthFix && this.options.navPos === 'side' && !this.isOver;
  }

  // Demo purposes only
  @HostBinding('class.theme-dark') get themeDark() {
    return this.options.theme === 'dark';
  }

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private media: MediaMatcher,
    private settings: SettingsService,
    private overlay: OverlayContainer
  ) {
    // Set dir attr on body
    document.body.dir = this.options.dir;

    this.mobileQuery = this.media.matchMedia(`(max-width: ${WIDTH_BREAKPOINT})`);
    this.mobileQueryListener = () => this.cdr.detectChanges();
    /**
     * Safari & IE don't support `addEventListener`
     * this.mobileQuery.addEventListener('change', this.mobileQueryListener);
     */
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this.mobileQueryListener);

    // TODO: Scroll top to container
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.content.scrollTo({ top: 0 });
      }
    });
  }

  ngOnInit() {
    setTimeout(() => (this.contentWidthFix = false));
  }

  ngOnDestroy() {
    /**
     * Safari & IE don't support `removeEventListener`
     * this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
     */
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  toggleCollapsed() {
    this.sidenavCollapsed = !this.sidenavCollapsed;

    // TODO: Trigger when animation end
    setTimeout(() => {
      this.settings.setNavState('collapsed', this.sidenavCollapsed);
    }, 400);
  }

  openedChange(e: boolean) {
    this.settings.setNavState('opened', e);
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
