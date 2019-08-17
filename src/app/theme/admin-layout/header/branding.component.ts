import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="matero-branding">
      <img src="./assets/images/matero.png" class="matero-branding-logo-expanded" alt="" />
      <span class="matero-branding-name">MATERO</span>
    </div>
  `,
})
export class BrandingComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
