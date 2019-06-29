import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customizer',
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss'],
})
export class CustomizerComponent implements OnInit {
  opened = false;

  constructor() {}

  ngOnInit() {}

  togglePanel() {
    this.opened = !this.opened;
  }

  openPanel() {
    this.opened = true;
  }

  closePanel() {
    this.opened = false;
  }
}
