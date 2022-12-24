import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="matero-branding" href="/">
      <img src="./assets/images/matero.png" class="matero-branding-logo" alt="logo" />
      <span class="matero-branding-name">MATERO</span>
    </a>
  `,
  styles: [
    `
      .matero-branding {
        display: inline-block;
        border-radius: 50rem;
        white-space: nowrap;
        color: inherit !important;
      }

      .matero-branding-logo {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }

      .matero-branding-name {
        margin: 0 10px;
        font-size: 16px;
        font-weight: 500;
        vertical-align: middle;
      }
    `,
  ],
})
export class BrandingComponent {}
