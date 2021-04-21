import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

@Component({
  selector: 'app-permissions-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class PermissionsTestComponent implements OnInit {
  constructor(private roles: NgxRolesService, private permissions: NgxPermissionsService) {}

  ngOnInit() {}
}
