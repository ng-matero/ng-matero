import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'mobile-sidenav',
  templateUrl: 'mobile-sidenav.html',
  styleUrls: ['shared.scss', 'mobile-sidenav.scss'],
})
export class SidenavMobileComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  filler = Array(20).fill(0);

  mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
