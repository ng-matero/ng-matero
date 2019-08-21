/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'mobile-sidenav',
  templateUrl: 'mobile-sidenav.html',
  styleUrls: ['shared.scss', 'mobile-sidenav.scss'],
  host: { class: 'demo-sidenav-app' },
})
export class SidenavMobileComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  filler = Array(20).fill(0);

  mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
