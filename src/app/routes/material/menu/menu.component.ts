import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  name = 'Angular 5';
  objectKeys = Object.keys;

  menu = {
    main1: ['sub1', 'sub2'],
    main2: ['sub1', 'sub2', 'sub3'],
  };

  constructor() {}

  ngOnInit() {}
}
