import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="matero-branding d-inline-block text-nowrap r-full text-reset" href="/">
      <img src="./assets/images/matero.png" class="matero-branding-logo align-middle" alt="logo" />
      <span class="matero-branding-name align-middle f-s-16 f-w-500">MATERO</span>
    </a>
  `,
  styles: [
    `
      .matero-branding-logo {
        width: 30px;
        height: 30px;
      }

      .matero-branding-name {
        margin: 0 10px;
      }
    `,
  ],
})
export class BrandingComponent {}
