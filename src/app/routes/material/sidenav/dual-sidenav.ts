/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'dual-sidenav',
  templateUrl: 'dual-sidenav.html',
  styleUrls: ['shared.scss', 'dual-sidenav.scss'],
  host: { class: 'demo-sidenav-app' },
})
export class SidenavDualComponent {
  constructor(private snackbar: MatSnackBar) {}

  play(list: string) {
    this.snackbar.open(`Playing "${list}"`, '', { duration: 1000 });
  }
}
