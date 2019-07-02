import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { SettingsService } from '@core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  sidenavCollapsed = false;
  options = this.settings.getOptions();
  mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;

  get isOver(): boolean {
    return this.mobileQuery.matches;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private media: MediaMatcher,
    private settings: SettingsService
  ) {
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
    this.sidenavCollapsed = !this.sidenavCollapsed;
    // TODO: trigger when animation end
    setTimeout(() => {
      this.settings.setCollapseStatus(this.sidenavCollapsed);
    }, 400);
  }

  receiveOptions(options: any): void {
    this.options = options;
  }

  openedChang(e: boolean) {
    this.settings.setOpenStatus(e);
  }
}
