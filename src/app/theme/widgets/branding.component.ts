import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="d-inline-block text-nowrap r-full text-reset" href="/">
      <img src="./assets/images/matero.png" class="brand-logo align-middle m-2 r-full" alt="logo" />
      <span class="align-middle f-s-16 f-w-500 m-x-8">MATERO</span>
    </a>
  `,
  styles: [
    `
      .brand-logo {
        width: 30px;
        height: 30px;
      }
    `,
  ],
})
export class BrandingComponent {}
