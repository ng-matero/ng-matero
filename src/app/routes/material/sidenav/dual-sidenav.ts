/* eslint-disable @angular-eslint/no-host-metadata-property */
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
