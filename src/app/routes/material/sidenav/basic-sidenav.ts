/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Component } from '@angular/core';

@Component({
  selector: 'basic-sidenav',
  templateUrl: 'basic-sidenav.html',
  styleUrls: ['shared.scss'],
  host: { class: 'demo-sidenav-app' },
})
export class SidenavBasicComponent {}
