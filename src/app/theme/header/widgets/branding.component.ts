import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="matero-branding" href="#/">
      <img src="./assets/images/matero.png" class="matero-branding-logo-expanded" alt="logo" />
      <span class="matero-branding-name">MATERO</span>
    </a>
  `,
  styles: [
    `
      .matero-branding {
        display: inline-block;
        color: inherit;
        font-size: 16px;
        white-space: nowrap;
      }

      .matero-branding-logo-expanded {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        vertical-align: middle;

        [dir='rtl'] & {
          margin-left: 10px;
          margin-right: auto;
        }
      }

      .matero-branding-name {
        font-weight: normal;
        vertical-align: middle;
      }
    `,
  ],
})
export class BrandingComponent {}
