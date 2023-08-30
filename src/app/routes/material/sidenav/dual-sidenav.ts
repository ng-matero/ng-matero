import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'dual-sidenav',
  templateUrl: 'dual-sidenav.html',
  styleUrls: ['shared.scss', 'dual-sidenav.scss'],
})
export class SidenavDualComponent {
  constructor(private snackbar: MatSnackBar) {}

  play(list: string) {
    this.snackbar.open(`Playing "${list}"`, '', { duration: 1000 });
  }
}
