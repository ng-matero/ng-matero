import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-helpers',
  templateUrl: './helpers.component.html',
  styleUrls: ['./helpers.component.scss'],
})
export class HelpersComponent implements OnInit {
  elevations = [];

  constructor() {
    for (let i = 0; i < 24; i++) {
      this.elevations.push(i);
    }
  }

  ngOnInit() {}
}
