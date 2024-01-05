import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MtxAlertModule } from '@ng-matero/extensions/alert';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';

import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-permissions-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  standalone: true,
  imports: [JsonPipe, MtxAlertModule, NgxPermissionsModule, PageHeaderComponent],
})
export class PermissionsTestComponent {
  comparedPermission: string[] = ['guest'];

  constructor(private permissionsSrv: NgxPermissionsService) {}

  getPermissions() {
    return Object.keys(this.permissionsSrv.getPermissions());
  }

  addPermission() {
    // this.permissionsSrv.loadPermissions(['admin']);
    this.permissionsSrv.addPermission('admin', () => {
      // return false;
      return new Promise<boolean>((resolve, reject) => {
        setTimeout(() => resolve(true), 2000);
      });
    });
  }

  removePermission() {
    this.permissionsSrv.removePermission('admin');
  }

  unAuthorized() {
    console.log('unAuthorized');
  }

  authorized() {
    console.log('authorizes');
  }

  changeToAdmin() {
    this.comparedPermission = ['admin'];
    console.log(this.comparedPermission);
  }

  changeToAnotherPermission() {
    this.comparedPermission = ['awesome'];
    console.log(this.comparedPermission);
  }

  changeToGuest() {
    this.comparedPermission = ['guest'];
    console.log(this.comparedPermission);
  }
}
