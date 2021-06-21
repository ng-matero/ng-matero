import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-permissions-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class PermissionsTestComponent implements OnInit {
  permission: string[] = ['guest'];

  constructor(private permissionsSrv: NgxPermissionsService) {}

  ngOnInit() {}

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
    this.permission = ['admin'];
    console.log(this.permission);
  }

  changeToAnotherPermission() {
    this.permission = ['AWESOME'];
    console.log(this.permission);
  }

  changeToGuest() {
    this.permission = ['guest'];
    console.log(this.permission);
  }
}
